import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from 'src/app/shared/model/question.model';

@Component({
  selector: 'app-checkbox-question',
  templateUrl: './checkbox-question.component.html',
  styleUrls: ['./checkbox-question.component.scss']
})
export class CheckboxQuestionComponent implements OnInit {
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
