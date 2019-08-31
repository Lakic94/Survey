import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InputQuestionComponent } from './input-question/input-question.component';
import { DialogComponent } from '../dialog/dialog.component';
import { HomeService } from '../home/home.service';
import { FormsService } from '../shared/forms.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  title = "Title";
  private _rowId: any;

  survey:any;

  form: FormGroup;

  questions: any = [];

  constructor(
    public matDialog: MatDialog,
    private homeService: HomeService,
    private sharedService: FormsService
  ) {

    this.homeService.rowIdChanged.subscribe(result => {
      this._rowId = result;
    });


  }

  ngOnInit() {
    this.getQuestions();

  }

  openDialog() {

    this.matDialog.open(DialogComponent, {
      width: '50%',
      height: '70%',
      data: this._rowId
    })


  }

  getQuestions() {
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
      console.log(this.form.value);

      console.log(this.questions)

    })

  }

  onSubmit() {

    if(this.survey.questions.answers){
      this.survey.questions.answers.push(this.form.value)
      console.log("ima")
    }
    else{
      this.survey.questions.answers = []
      console.log(this.form.value)
      this.survey.questions.answers.push(this.form.value)
      console.log("nema")
      console.log(this.survey.question.answers)
       console.log(this.survey)
    }

    delete this.survey._id
   
    this.sharedService.update("Survey", this._rowId,this.survey).subscribe(e=>console.log(e))

    

    

  }

}