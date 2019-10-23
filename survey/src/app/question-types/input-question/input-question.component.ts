import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from 'src/app/shared/model/question.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-question',
  templateUrl: './input-question.component.html',
  styleUrls: ['./input-question.component.scss']
})
export class InputQuestionComponent implements OnInit {
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
