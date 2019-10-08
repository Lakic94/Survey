import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsService } from '../shared/forms.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formModel } from '../shared/form.model';
import { Question } from '../shared/question.model';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  questionTypes = [
    'Input',
    'Radio',
    'Checkbox',
    'Select',
    'Text'
  ]

  survey: formModel;
  res: any;
  typeOfQuestion = false;
  questionFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formsService: FormsService,
    private _snackBar: MatSnackBar,
    private matDialogRef: MatDialog
  ) {
    this.formsService.getById("Survey", this.data).subscribe(res => { this.survey = res });
  }


  ngOnInit() {
    this.questionFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      questionType: ['', Validators.required],
      options: this._formBuilder.array([
        this._formBuilder.control('')
      ])
    });
    this.questionTypeValidator();
  }

  addItem() {
    this.optionsArray.push(this._formBuilder.control(''));
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
    }
    else this.typeOfQuestion = true;
  }

  onSubmit(form: FormGroup) {
    this.addQuestion(form)
    delete this.survey._id;
    if (this.questionFormGroup.valid) {
      this.formsService.update("Survey", this.data, this.survey
      ).subscribe(e => console.log(e))
      this._snackBar.open("Added", "Close", {
        duration: 2000
      })
      this.questionFormGroup.reset();

    }
    this.matDialogRef.closeAll()
  }

  addQuestion(form) {
    let question = new Question(form.value)
    if (form.controls.options.value != "") {
      let options = form.controls.options.value
      console.log(question)
      question.option(options);
    }
    this.survey.questions.push(question)
  }

  validateControl(controlName) {
    if (this.questionFormGroup.controls[controlName].invalid && this.questionFormGroup.controls[controlName].touched) {
      return true;
    }
    else
      false;
  }

  minLengthArray(min: number) {
    return (c: AbstractControl): { [key: string]: any } => {
      if (c.value.length >= min)
        return null;
      return { 'minLengthArray': { valid: false } };
    }
  }

  questionTypeValidator() {
    this.questionFormGroup.get('questionType').valueChanges.subscribe(questionType => {
      if (questionType === "Input" || questionType === "Text") {
        this.questionFormGroup.get('options').setValidators(null)
      }
      else {
        this.questionFormGroup.get('options').setValidators(this.minLengthArray(2))
      }
      this.questionFormGroup.get('options').updateValueAndValidity();
    })
  }
}

