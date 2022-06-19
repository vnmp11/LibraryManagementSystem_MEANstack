import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable } from "rxjs";


@Injectable({
  providedIn:'root'
})

export class CountService {

  constructor(private http: HttpClient){ }

  getCount(){
    let options = {
      headers: new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    return this.http.post("http://localhost:3000/api/count", options);
  }
}
