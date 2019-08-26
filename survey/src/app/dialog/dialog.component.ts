import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsService } from '../shared/forms.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formModel } from '../shared/form.model';
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

  questions:string[];

  res: any;

  selectedType = false;

  questionFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formsService: FormsService,
    private _snackBar: MatSnackBar
  ) {
    this.formsService.getById("Survey", this.data).subscribe(res => { this.res = res });
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



  onSubmit() {
    // console.log(this.res)
    // if (this.res.question) {
    //   this.res.questions.push(this.questionFormGroup.value);
    //   console.log('ima niza')
    // }
    // else {
    //   this.res.questions = [];
    //   this.res.questions.push(this.questionFormGroup.value)
    // }

    

    console.log(this.questionFormGroup.value)

    // this.questions.push(this.questionFormGroup.value)

    console.log(this.res)

    // delete this.res._id;
    
    this.questionFormGroup.reset();
    // this.formsService.update("Survey", this.data, this.questionFormGroup.value
    // ).subscribe()

    
  }

}
