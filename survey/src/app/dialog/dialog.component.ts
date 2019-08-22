import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

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

  
  selectedType=false;

  cisLinear = false;
  questionFormGroup: FormGroup;
  // secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.questionFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      questionType: ['', Validators.required],
      options: this._formBuilder.array([
        this._formBuilder.control('', Validators.required)
      ])

    });

  }

  addItem(){
    this.optionsArray.push(this._formBuilder.control(''));
  }

  get optionsArray(){
    return this.questionFormGroup.get('options') as FormArray;
  }

  removeItem(index:number){
    this.optionsArray.removeAt(index);
  }

  selectedTyp(event){
    if(event === 'Input'){
      this.selectedType = false;
    }
    else this.selectedType = true;
  }

  onSubmit(){
    console.log(this.questionFormGroup.value);
  }

  
}
