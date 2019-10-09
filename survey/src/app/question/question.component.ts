import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HomeService } from '../home/home.service';
import { FormsService } from '../shared/forms.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { formModel } from '../shared/form.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  matDialogRef: MatDialogRef<DialogComponent>;
  survey: formModel;
  form: FormGroup;
  questions: any = [];
  title: string;
  desc: string;

  

  private _rowId: any;

  constructor(
    public matDialog: MatDialog,
    private homeService: HomeService,
    private sharedService: FormsService,
    private _formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private tokenService: TokenService
  ) {
    this.homeService.rowIdChanged.subscribe(result => {
      this._rowId = result;
    });
  }


  ngOnInit() {
    this._rowId = this.route.snapshot.paramMap.get('id');
    this.form = this._formBuilder.group({})
    this.getQuestions();
  }

  openDialog() {
    this.matDialogRef = this.matDialog.open(DialogComponent, {
      data: this._rowId
    })

    this.matDialogRef.afterClosed().subscribe(a => {
      this.getQuestions()
    })
  }

  getQuestions() {
    this.questions = []
    this.form.reset()
    return this.sharedService.getById('Survey', this._rowId).subscribe(e => {
      this.survey = e;
      if (e.questions === undefined) {
        return;
      }
      else {
        for (let i of e.questions) {
          this.questions.push(i)
        }
      }
      this.form = this.homeService.toFormGroup(this.questions);
    })
    
  }

  deleteQuestion(event) {
    this.survey.questions.splice(event, 1)
    delete this.survey._id
    this.sharedService.update("Survey", this._rowId, this.survey
    ).subscribe(e => this.getQuestions())
  }

  navigate(){
    this.router.navigate(['/answer/', this._rowId]);
  }
}