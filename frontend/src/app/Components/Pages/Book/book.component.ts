import { Component, OnInit } from "@angular/core";
import { provideRoutes } from "@angular/router";
import { BookService } from "src/app/Servies/book.module";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  providers: []
})
export class BookComponent implements OnInit {

  ngOnInit(){}

  form!: FormGroup;

    public newBook = {title:'', author:'', description:'', price:'', _id:"", image:"", status:"", idBorrower:'', kind :'',dateCreate:''};
    image: any;

    //day la list Book
    arrBook:any = []

    constructor( private bookService: BookService){
      bookService.getBook().subscribe(data=>{
        console.log(data);
        this.arrBook = data;
      });
    }

    checkSelected(){
      var e = document.getElementById("kind") as HTMLSelectElement;
     this.newBook.kind = e.options[e.selectedIndex].value;
     //alert(this.newBook.kind);
    }

    post() {


      this.checkSelected();

     const formData = new FormData();
      formData.append('title', this.newBook.title);
      formData.append('author', this.newBook.author);
      formData.append('description', this.newBook.description);
      formData.append('price', this.newBook.price);
      formData.append('file', this.image);


      formData.append('kind', this.newBook.kind);
      formData.append('dateCreate', Date.now().toString());

      console.log(formData);
      this.bookService.addBook(formData);

    }



    update() {


      this.checkSelected();

      const formData = new FormData();
      formData.append('_id', this.newBook._id);
      formData.append('title', this.newBook.title);
      formData.append('author', this.newBook.author);
      formData.append('description', this.newBook.description);
      formData.append('price', this.newBook.price);
      formData.append('file', this.image);
      //formData.append('status', this.newBook.status);
      //formData.append('idBorrower', this.newBook.idBorrower);
      formData.append('kind', this.newBook.kind);
      //formData.append('dateCreate', Date.now().toString());
      console.log(formData);
      this.bookService.updateBook(formData);
    }

    delete(){
      console.log(this.newBook);
      this.bookService.deleteBook(this.newBook);
    }

    selectImage(event:any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.image = file;
      }
    }

}
