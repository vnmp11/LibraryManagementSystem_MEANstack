import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { observable } from "rxjs";


@Injectable({
  providedIn:'root'
})

export class ChangePasswordService{
  constructor(private http: HttpClient){}

  changePass(newPass:any){
    console.log("readerOjb",newPass);
    return this.http.put("http://localhost:3000/api/updatePassword", newPass).subscribe(res => {
      console.log(res);
    });
  }
}
