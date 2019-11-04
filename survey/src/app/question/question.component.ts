import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { AddQuestionDialogComponent } from '../add-question-dialog/add-question-dialog.component';
import { MetadataService } from '../shared/metadata.service';
import { FormsService } from '../shared/forms.service';
import { formModel } from '../shared/model/form.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  matDialogRef: MatDialogRef<AddQuestionDialogComponent>;
  survey: formModel;
  form: FormGroup;
  questions: any = [];
  title: string;
  desc: string;
  checked = true;
  private rowId: any;
  notValidate = true;

  constructor(
    public matDialog: MatDialog,
    private metaService: MetadataService,
    private formsService: FormsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.rowId = this.route.snapshot.paramMap.get('id');
    this.form = this.formBuilder.group({});
    this.getQuestions();
  }

  openDialog() {
    this.matDialog
      .open(AddQuestionDialogComponent)
      .afterClosed()
      .subscribe(a => {
        if (a !== undefined) {
          this.questions.push(a);
          this.form = this.formsService.toFormGroup(this.questions);
          this.checked = false;
        }
        console.log(this.questions);
        console.log(a);
      });
  }

  getQuestions() {
    return this.metaService
      .getById('Survey', this.rowId)
      .subscribe(response => {
        this.survey = response;

        if (response.questions) {
          for (const i of response.questions) {
            this.questions.push(i);
          }
          this.form = this.formsService.toFormGroup(this.questions);
        }
      });
  }

  deleteQuestion(event) {
    console.log(event);
    this.questions.splice(event, 1);
    this.checked = false;
  }

  navigate() {
    this.router.navigate(['/answer/', this.rowId]);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    this.checked = false;
  }

  saveQuestion() {
    this.survey.questions = this.questions;
    delete this.survey._id;
    this.metaService.update('Survey', this.rowId, this.survey).subscribe();
    this.checked = true;
    this.snackBar.open('Saved', 'Close', {
      duration: 2000
    });
  }

  edit(index) {
    this.matDialog
      .open(AddQuestionDialogComponent, {
        data: this.questions[index]
      })
      .afterClosed()
      .subscribe(a => {
        if (a !== undefined) {
          this.questions.splice(index, 1, a);
          this.form = this.formsService.toFormGroup(this.questions);
          this.checked = false;
          console.log(a);
        }
      });
  }
}
