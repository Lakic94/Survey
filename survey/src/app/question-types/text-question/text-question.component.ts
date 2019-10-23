import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Question } from 'src/app/shared/model/question.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-question',
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.scss']
})
export class TextQuestionComponent implements OnInit {
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
