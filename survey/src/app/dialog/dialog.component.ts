import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  questionTypes = [
    'input',
    'radio',
    'checkbox',
    'select'

  ]

  answerOption=[
    {name:'poz'},
    {name:'asdas'},
    {name:'poz'},
    {name:'asdas'}
  ]

  selectedTyp(event){
    if(event === 'input'){
      this.selectedType = false;
    }
    else this.selectedType = true;
  }
  selectedType=false;

  cisLinear = false;
  questionFormGroup: FormGroup;
  // secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.questionFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      questionType: ['', Validators.required],
      options: this._formBuilder.array([{name:'poz'},{name:'poaa'}])

    });

  }

  createItem(){
    return this._formBuilder.group({
      name: ''
    });
  }

  addItem(){
    this.OptionsArray.push(this.createItem());
  }

  get OptionsArray(){
    return this.questionFormGroup.get('options') as FormArray;
  }

}
