import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

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
      group[element.title] = new FormControl('')
    });

    return new FormGroup(group);

  }
}
