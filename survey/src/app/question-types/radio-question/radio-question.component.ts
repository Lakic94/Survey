import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from 'src/app/shared/model/question.model';

@Component({
  selector: 'app-radio-question',
  templateUrl: './radio-question.component.html',
  styleUrls: ['./radio-question.component.scss']
})
export class RadioQuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() form: FormGroup;
  @Input() notValidate: boolean;

  constructor() {}

  ngOnInit() {}

  validateControl(controlName) {
    if (this.notValidate) {
      return false;
    }
    if (
      this.form.controls[controlName].invalid &&
      this.form.controls[controlName].touched
    ) {
      return true;
    }
  }
}
