import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { FormsService } from '../shared/forms.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { formModel } from '../shared/form.model';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../shared/token.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  private _rowId: any;
  questions: any = [];
  form: FormGroup;
  survey: formModel;

  answer = {
    userId: '',
    answer: []
  }

  constructor(
    private homeService: HomeService,
    private sharedService: FormsService,
    private _formBuilder: FormBuilder,
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
    console.log(this.form)
  }

  getQuestions() {
    this.questions = []
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
      console.log(this.form)
    })

  }

  onSubmit() {
    let formValues = this.form.value
    let arrOfQuestions = this.survey.questions

    for (let i = 0; i < arrOfQuestions.length; i++) {
      for (let fValue in formValues) {
        if (arrOfQuestions[i].title === fValue) {
          const answerObj = Object.create(this.answer)
          if (Array.isArray(formValues[fValue])) {
            let values = (Object.values(formValues[fValue]))
            let checkboxAnswers = []

            for (let j = 0; j < values.length; j++) {
              if (values[j] === true) {
                checkboxAnswers.push(arrOfQuestions[i].options[j])
              }
            }
            answerObj.userId = this.tokenService.getId();
            answerObj.answer = checkboxAnswers;
            this.survey.questions[i].answers.push(answerObj)
          }
          else {
            answerObj.userId = this.tokenService.getId();
            answerObj.answer = formValues[fValue]
            this.survey.questions[i].answers.push(answerObj)
            break;
          }
        }
      }
    }

    delete this.survey._id
    this.sharedService.update("Survey", this._rowId, this.survey).subscribe()
    this.form.reset()

    console.log(this.survey)
  }

  validateControl(controlName) {
    if (this.form.controls[controlName].invalid && this.form.controls[controlName].touched) {
      return true;
    }
    else
      false;
  }

}
