import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { observable } from "rxjs";
import { Router } from "@angular/router";
import { data } from "jquery";


@Injectable({
  providedIn:'root'
})

export class LoginService{
  constructor(private http: HttpClient, private route:Router){}
  login(newLogin:any){
    console.log("readerOjb",newLogin);
    return this.http.post("http://localhost:3000/api/login", newLogin)
  }
}
