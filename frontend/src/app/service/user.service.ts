import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { observable } from "rxjs";


@Injectable({
  providedIn:'root'
})
export class UserService{
  constructor(private http: HttpClient){}

  getUser(){
    let options = {
      headers: new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    return this.http.post("http://localhost:3000/api/user", options);
  }

  addUser(newUser:any)  {

    console.log("readerOjb",newUser);
    return this.http.post('http://localhost:3000/api/addUser', newUser).subscribe(res => {
      console.log(res);
    });
  }

  updateUser(formData:any)  {
    console.log("readerOjb",formData);
    return this.http.put('http://localhost:3000/api/updateUser', formData).subscribe(res => {
      console.log(res);
    });
  }

  deleteUser(newUser:any)  {
    console.log("readerOjb",newUser);
    return this.http.post('http://localhost:3000/api/deleteUser', newUser).subscribe(res => {
      console.log(res);
    });
  }

  testanh(formData:any){
    this.http.post<any>('http://localhost:3000/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
