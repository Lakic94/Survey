import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

let survey = [
  {name:'Item'},
  {name:'Item'},
  {name:'Item'}
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  dataSource = survey;

  form: FormGroup;

  

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name:'',
      credentials: this.fb.array([]),
    });
  }

  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.fb.group({
      username: '',
      password: '',
    }));

    console.log('addcred')

    
  }

  submit(){
    console.log(this.form.controls)

    console.log('submit')

  }

  ngOnInit(){}

}
