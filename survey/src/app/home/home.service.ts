import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, FormArray, Validators, ValidatorFn } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class HomeService {
  id: any = "";
  rowIdChanged: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() { }


  emitRowIdChanged(id: any) {
    this.rowIdChanged.next(id);
    this.id = id;
  }

  toFormGroup(questions: any) {
    let group: any = {};
    questions.forEach(element => {
      if(element.required == true){
        if (element.questionType === 'Checkbox') {
          group[element.title] = new FormArray([], this.minSelected(1))
          element.options.map(i => {
            i = new FormControl(null);
            (group[element.title] as FormArray).push(i)
          })
        }
        else {
          group[element.title] = new FormControl('', Validators.required)
        }      
      }
      else{
        if (element.questionType === 'Checkbox') {
          group[element.title] = new FormArray([],null)
          element.options.map(i => {
            i = new FormControl(null);
            (group[element.title] as FormArray).push(i)
          })
        }
        else {
          group[element.title] = new FormControl('')
        }
      }
    })

    return new FormGroup(group);
  }

  minSelected(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }
}
