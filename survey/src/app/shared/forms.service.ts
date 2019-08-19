import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http:HttpClient) { }

  readonly Url="http://localhost/8080/api";

  getById(collection:string, id:number):Observable<any>{
    return this.http.get(this.Url+`${collection}/${id}`);
  }

  getByFilter(collection:string):Observable<any>{
    return this.http.get(this.Url+`${collection}/filter`);
  }

  getAll(collection:string):Observable<any>{
    return this.http.get(this.Url+`${collection}`);
  }

  add(collection:string, data:any):Observable<any>{
    return this.http.post(this.Url+`${collection}`,data);
  }

  update(collection:string,id:number, data:any):Observable<any>{
    return this.http.post(this.Url+`${collection}/${id}`,data);
  }

  delete(collection:string, id:number):Observable<any>{
    return this.http.delete(this.Url+`${collection}/${id}`);
  }

  
}
