import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InputQuestionComponent } from './input-question/input-question.component';
import { DialogComponent } from '../dialog/dialog.component';
import { HomeService } from '../home/home.service';
import { FormsService } from '../shared/forms.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { formModel } from '../shared/form.model';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  private _rowId: any;

  survey: formModel;

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
      width: '30%',
      height: '70%',
      data: this._rowId
    })


  }

  getQuestions() {
    return this.sharedService.getById('Survey', this._rowId).subscribe(e => {
      this.survey = e;
      console.log(this.survey)
      if (e.questions === undefined) {
        return;
      }
      else {
        for (let i of e.questions) {
          this.questions.push(i)
        }

      }

      this.form = this.homeService.toFormGroup(this.questions);

      console.log(this.form)

    })



  }

  onSubmit() {


    let formValues = this.form.value

    let arrOfQuestions = this.survey.questions


    for (let i = 0; i < arrOfQuestions.length; i++) {

      for (let fValue in formValues) {

        if (arrOfQuestions[i].title === fValue) {

          if (Array.isArray(formValues[fValue])) {

            let values = (Object.values(formValues[fValue]))

            let checkboxAnswers = []

            for (let j = 0; j < values.length; j++) {
              if (values[j] === true) {
                console.log(values[j]+""+j)
                console.log(arrOfQuestions[i].options[j])

                checkboxAnswers.push(arrOfQuestions[i].options[j])
    
              }
              
            }

            arrOfQuestions[i].answers.push(checkboxAnswers)
          }

          else {

            arrOfQuestions[i].answers.push(formValues[fValue])
            delete formValues[fValue]
            break;

          }
        }

      } 

      delete this.survey._id

      this.sharedService.update("Survey", this._rowId, this.survey).subscribe()

    }

  }
}