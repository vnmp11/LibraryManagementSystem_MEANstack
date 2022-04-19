import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { observable } from "rxjs";


@Injectable({
  providedIn:'root'
})

export class CategoryService{
  constructor(private http: HttpClient){}


  getCategory(){
    let options = {
      headers: new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    return this.http.post("http://localhost:3000/api/category", options);
  }

  addCategory(newCate:any){
    console.log("readerOjb",newCate);
    return this.http.post("http://localhost:3000/api/addCategory", newCate).subscribe(res => {
      console.log(res);
    });
  }

  deleteCategory(newCate:any)  {
    console.log("readerOjb",newCate);
    return this.http.post('http://localhost:3000/api/deleteCategory', newCate).subscribe(res => {
      console.log(res);
    });
  }
}
