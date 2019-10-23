import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from 'src/app/shared/model/question.model';

@Component({
  selector: 'app-select-question',
  templateUrl: './select-question.component.html',
  styleUrls: ['./select-question.component.scss']
})
export class SelectQuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() form: FormGroup;
  @Input() notValidate: boolean;

  constructor() {}

  ngOnInit() {
  }

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
