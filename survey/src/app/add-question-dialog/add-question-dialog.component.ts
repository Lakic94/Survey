import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MetadataService } from '../shared/metadata.service';
import { formModel } from '../shared/model/form.model';
import { Question } from '../shared/model/question.model';
import { QuestionTypesLabels } from '../shared/question-types.enum';

@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.scss']
})
export class AddQuestionDialogComponent implements OnInit {
  checked = false;
  survey: formModel;
  typeOfQuestion = false;
  questionFormGroup: FormGroup;

  questionTypes = QuestionTypesLabels;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private metaService: MetadataService,
    private matDialogRef: MatDialogRef<AddQuestionDialogComponent>
  ) {
    this.questionFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      questionType: ['', Validators.required],
      options: this.formBuilder.array([this.formBuilder.control(null)])
    });
    this.questionTypeValidator();
  }

  ngOnInit() {
    if (this.data != null) {
      this.questionToForm(this.data);
    }
  }

  addItem() {
    this.optionsArray.push(this.formBuilder.control(''));
  }

  get optionsArray() {
    return this.questionFormGroup.get('options') as FormArray;
  }

  removeItem(index: number) {
    this.optionsArray.removeAt(index);
  }

  selectedType(event) {
    if (event === 'Input' || event === 'Text') {
      this.typeOfQuestion = false;
    } else {
      this.typeOfQuestion = true;
    }
  }

  onSubmit(form: FormGroup) {
    const a = this.addQuestion(form);
    console.log(form.controls.options.value);

    this.questionFormGroup.reset();
    console.log(form);

    this.matDialogRef.close(a);
  }

  addQuestion(form) {
    const question = new Question(form.value);
    if (form.controls.options.value !== '') {
      const options = form.controls.options.value;
      question.option(options);
    }
    question.required = this.checked;

    return question;
  }

  minLengthArray(min: number) {
    return (c: AbstractControl): { [key: string]: any } => {
      if (c.value.length >= min) {
        return null;
      }
      return { minLengthArray: { valid: false } };
    };
  }

  questionTypeValidator() {
    this.questionFormGroup
      .get('questionType')
      .valueChanges.subscribe(questionType => {
        if (questionType === 'Input' || questionType === 'Text') {
          this.questionFormGroup.get('options').setValidators(null);
        } else {
          this.questionFormGroup
            .get('options')
            .setValidators(this.minLengthArray(2));
        }
        this.questionFormGroup.get('options').updateValueAndValidity();
      });
  }

  changed() {
    this.checked = !this.checked;
  }

  questionToForm(data) {
    this.questionFormGroup.controls.title.setValue(data.title);
    this.questionFormGroup.controls.questionType.setValue(data.questionType);
    if (data.options !== '') {
      this.optionsArray.controls.splice(0);
      this.typeOfQuestion = true;
      for (const i of data.optios) {
        this.optionsArray.controls.push(
          this.formBuilder.control(data.options[i])
        );
      }
    }
  }
}
