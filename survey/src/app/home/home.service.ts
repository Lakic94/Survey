import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, FormArray, Validators, ValidatorFn } from '@angular/forms';

export function minSelected(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  id:any = "";
  
  rowIdChanged: BehaviorSubject < string > = new BehaviorSubject < string > (null);

  constructor() { }

  emitRowIdChanged(id: any) {
    this.rowIdChanged.next(id);
    this.id = id;
  }

  toFormGroup(questions:any){
    let group:any={};
    

    questions.forEach(element => {

      if(element.questionType === 'Checkbox'){
        group[element.title] = new FormArray([],minSelected(1))
        element.options.map(i => {
           i = new FormControl(null);
          (group[element.title] as FormArray).push(i)
          
        })
      }
      else{
        group[element.title] = new FormControl('', Validators.required)
      }
      
    });

    return new FormGroup(group);

  }

  
}
