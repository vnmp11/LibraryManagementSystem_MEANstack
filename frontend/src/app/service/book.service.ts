import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable } from "rxjs";


@Injectable({
  providedIn:'root'
})

export class BookService {
 
   constructor(private http: HttpClient){ }

  getBook(){
    let options = {
      headers: new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    return this.http.post("http://localhost:3000/api/book", options);
  }

  getABook(id){
    let options = {
      headers: new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }

    return this.http.get("http://localhost:3000/api/book/" + id, options);

  }

  addBook(formData:any)  {
    console.log("readerOjb",formData);
    return this.http.post('http://localhost:3000/api/addBook', formData).subscribe(res => {
      console.log(res);
    });
  }

  updateBook(formData:any)  {
    console.log("readerOjb",formData);
    return this.http.put('http://localhost:3000/api/updateBook', formData).subscribe(res => {
      console.log(res);
    });
  }

  updateABook(formData:any)  {
    console.log("readerOjb",formData);
    return this.http.put('http://localhost:3000/api/updateABook', formData).subscribe(res => {
      console.log(res);
    });
  }

  deleteBook(newBook:any)  {
    console.log("readerOjb",newBook);

    
    return this.http.post('http://localhost:3000/api/deleteBook', newBook).subscribe(res => {
      console.log(res);
    });
  }
}
