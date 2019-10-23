import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../shared/metadata.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { formModel } from '../shared/model/form.model';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../shared/token.service';
import { FormsService } from '../shared/forms.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  private rowId: any;
  questions: any = [];
  form: FormGroup;
  survey: formModel;

  answer = {
    userId: '',
    answer: []
  };

  constructor(
    private formsService: FormsService,
    private metaService: MetadataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tokenService: TokenService
  ) {
    this.rowId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.getQuestions();
  }

  getQuestions() {
    return this.metaService.getById('Survey', this.rowId).subscribe(result => {
      this.survey = result;
      if (result.questions) {
        for (const i of result.questions) {
          this.questions.push(i);
        }
      }
      this.form = this.formsService.toFormGroup(this.questions);
    });
  }

  onSubmit() {
    const formValues = this.form.value;
    const arrOfQuestions = this.survey.questions;

    for (let i = 0; i < arrOfQuestions.length; i++) {
      for (const fValue in formValues) {
        if (arrOfQuestions[i].title === fValue) {
          const answerObj = Object.create(this.answer);
          if (Array.isArray(formValues[fValue])) {
            const values = Object.values(formValues[fValue]);
            const checkboxAnswers = [];

            for (let j = 0; j < values.length; j++) {
              if (values[j] === true) {
                checkboxAnswers.push(arrOfQuestions[i].options[j]);
              }
            }
            answerObj.userId = this.tokenService.getId();
            answerObj.answer = checkboxAnswers;
            this.survey.questions[i].answers.push(answerObj);
          } else {
            answerObj.userId = this.tokenService.getId();
            answerObj.answer = formValues[fValue];
            this.survey.questions[i].answers.push(answerObj);
            break;
          }
        }
      }
    }

    delete this.survey._id;
    this.metaService.update('Survey', this.rowId, this.survey).subscribe();
    this.form.reset();

    console.log(this.survey);
  }
}
