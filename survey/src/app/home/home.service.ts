import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

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
        group[element.title] = new FormArray([])
        element.options.map(i => {
          const control = new FormControl(null, Validators.required);
          (group[element.title] as FormArray).push(control)
          
        })
      }
      else{
        group[element.title] = new FormControl('', Validators.required)
      }
      
    });

    return new FormGroup(group);

  }
}
