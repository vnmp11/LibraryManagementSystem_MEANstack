import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { observable } from "rxjs";


@Injectable({
  providedIn:'root'
})

export class BorrowService{
  constructor(private http: HttpClient){}

  getBorrow(){
    let options = {
      headers: new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    return this.http.post("http://localhost:3000/api/borrow", options);
  }

  addBorrow(newBorrow:any){
    console.log("readerOjb",newBorrow);
    
    return this.http.post("http://localhost:3000/api/addBorrow", newBorrow).subscribe(res => {
      console.log(res);
    });
  }

  getBorrowID(idUser:any){
    console.log("readerOjb",idUser);
    return this.http.post("http://localhost:3000/api/borrowID", idUser).subscribe(res => {
      console.log(res);
    });
  }

  sentMail(mail:any){
    console.log("readerOjb",mail);
    return this.http.post("http://localhost:3000/send-email", mail).subscribe(res => {
      console.log(res);
    });
  }
}
