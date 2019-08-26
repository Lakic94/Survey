import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http:HttpClient) { }

  readonly Url="http://localhost:8000/api/Metadata/";

  getById(collection:string, id:string):Observable<any>{
    return this.http.get(this.Url+`${collection}/${id}`);
  }

  getAll(collection:string):Observable<any>{
    return this.http.get(this.Url+`${collection}`);
  }

  add(collection:string, data:any):Observable<any>{
    return this.http.post(this.Url+`${collection}`,data);
  }

  update(collection:string,id:string, data:any):Observable<any>{
    return this.http.put(this.Url+`${collection}/${id}`,data);
  }

  delete(collection:string, id:string):Observable<any>{
    return this.http.delete(this.Url+`${collection}/${id}`);
  }

  
}
