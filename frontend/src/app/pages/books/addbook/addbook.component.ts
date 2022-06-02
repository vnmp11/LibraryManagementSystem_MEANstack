import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BookService } from 'src/app/service/book.service';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss'],
})
export class AddBookComponent implements OnInit {

  constructor(private cateService: CategoryService, private bookService: BookService,  private formBuilder: FormBuilder){
    cateService.getCategory().subscribe(data=>{
      console.log(data);
      this.arrCate = data;
    });
   }
  
  ngOnInit() {
    this.addBookForm = this.formBuilder.group({
      title:  ['', [Validators.required, Validators.maxLength(50)]],
      author:  ['', Validators.required],
      price:  ['', Validators.required],
      quantity: ['', Validators.required],
      kind: ['', Validators.required],
      copyright: [''],
      publisher: [''],
      edition: [''],
      description: [''],
      image: [''],

    });
  }

  form!: FormGroup;
  addBookForm: FormGroup;
  arrCate:any = [];

    public newBook = {title:'', author:'', description:'', price:'', _id:"", image:"", status:"", idBorrower:'', kind :'',dateCreate:'',edition:'' ,publisher:'' ,quantity:'' ,copyright:'' };
    image: any;

    //day la list Book
    arrBook:any = []
    isFormSubmitted = false;


    checkSelected(){
      var e = document.getElementById("kind") as HTMLSelectElement;
      this.newBook.kind = e.options[e.selectedIndex].text;
    }

    post() {

      this.isFormSubmitted = true;

      this.checkSelected();

      const formData = new FormData();
      formData.append('title', this.newBook.title);
      formData.append('author', this.newBook.author);
      formData.append('description', this.newBook.description);
      formData.append('price', this.newBook.price);
      formData.append('file', this.image);
      formData.append('kind',  this.newBook.kind);
      formData.append('quantity', this.newBook.quantity);
      formData.append('copyright', this.newBook.copyright);
      formData.append('publisher', this.newBook.publisher);
      formData.append('edition', this.newBook.edition);
      formData.append('dateCreate', Date.now().toString());

      console.log(formData);
      // Return if form is invalid
      if (this.addBookForm.invalid) {
        return;
      }

      // alert("cate:" + this.newBook.kind);
      this.bookService.addBook(formData);
      Swal.fire('Success!', 'Added Book Successfully!', 'success')

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
        (document.getElementById("filename") as HTMLInputElement).value = (document.getElementById("image") as HTMLInputElement).files[0].name;

      }
    }

    HandleBrowseClick()
    {
      var fileinput = document.getElementById("browse");
      fileinput.click();
    }

    Handlechange()
    {
      var fileinput = document.getElementById("browse");
      var textinput = document.getElementById("filename");
      
      (textinput as HTMLInputElement).value = (fileinput as HTMLInputElement).value;

      this.image = fileinput;


    } 

    resetForm()
  {
    (document.getElementById("title") as HTMLInputElement).value = "";
    (document.getElementById("author") as HTMLInputElement).value = "";
    (document.getElementById("price") as HTMLInputElement).value = "";
    (document.getElementById("edition") as HTMLInputElement).value = "";
    (document.getElementById("publisher") as HTMLInputElement).value = "";
    (document.getElementById("quantity") as HTMLInputElement).value = "";
    (document.getElementById("description") as HTMLInputElement).value = "";
    (document.getElementById("copyright") as HTMLInputElement).value = "";
    (document.getElementById("image") as HTMLInputElement).value = "";
    (document.getElementById("kind") as HTMLInputElement).value = undefined;
    
  }

}
