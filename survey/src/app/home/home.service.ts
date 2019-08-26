import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
}
