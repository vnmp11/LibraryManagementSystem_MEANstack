import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { observable } from "rxjs";


@Injectable({
  providedIn:'root'
})

export class ReturnService{
  constructor(private http: HttpClient){}

  getReturn(){
    let options = {
      headers: new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    return this.http.post("http://localhost:3000/api/return", options);
  }

  addReturn(newReturn:any){
    console.log("readerOjb",newReturn);
    return this.http.post("http://localhost:3000/api/addReturn", newReturn).subscribe(res => {
      console.log(res);
    });
  }

  getReturnID(idUser:any){
    console.log("readerOjb",idUser);
    return this.http.post("http://localhost:3000/api/returnID", idUser)
  }
}
