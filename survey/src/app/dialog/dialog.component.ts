import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsService } from '../shared/forms.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    'Select'
  ]

  res: any;

  selectedType = false;

  cisLinear = false;
  questionFormGroup: FormGroup;
  // secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formsService: FormsService,
    private _snackBar: MatSnackBar
  ) {
    this.formsService.getById("Survey", this.data).subscribe(res => { this.res = res, console.log(res.id) });
  }

  ngOnInit() {
    this.questionFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      questionType: ['', Validators.required],
      options: this._formBuilder.array([
        this._formBuilder.control('', Validators.required)
      ])

    });


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

  selectedTyp(event) {
    if (event === 'Input') {
      this.selectedType = false;
    }
    else this.selectedType = true;
  }

  openSnackBar() {

    this._snackBar.open("Question Added", 'Close', {
      duration: 1000
    })
  }

  onSubmit() {
    if (this.res.question) {
      this.res.questions.push(this.questionFormGroup.value);
    }
    else {
      this.res.questions = [];
      this.res.questions.push(this.questionFormGroup.value)
    }
    
    delete this.res._id;
    console.log(this.res)
    this.questionFormGroup.reset();
    this.formsService.update("Survey", this.data, this.res
    ).subscribe(res => console.log(res))
  }




}
