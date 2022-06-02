import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { quantity } from 'chartist';
import { BookService } from 'src/app/service/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewbooks',
  templateUrl: './viewbooks.component.html',
  styleUrls: ['./viewbooks.component.scss']
})
export class ViewBooksComponent implements OnInit {

  arrBook:any = [];
  book:any;
  book_image: any;
  selected_image = false;
  term = '';

  closeResult = '';
  editBookForm: FormGroup;
  isFormSubmitted = false;
  public newBook = {title:'', author:'', description:'', price:'', _id:"", image:"", status:"", idBorrower:'', kind :'',dateCreate:'',edition:'' ,publisher:'' ,quantity:'' ,copyright:'' };

  constructor( private bookService: BookService, private modalService: NgbModal, private formBuilder: FormBuilder) { 
    bookService.getBook().subscribe(data=>{
      console.log(data);
      this.arrBook = data;
    });

  }

  refesh(){
    this.bookService.getBook().subscribe(data=>{
      console.log(data);
      this.arrBook = data;
    });  
  }

  ngOnInit() {
    
    this.editBookForm = this.formBuilder.group({
      title:  ['', [Validators.minLength(1), Validators.maxLength(50)]],
      author:  ['', Validators.minLength(1),],
      price:  ['', Validators.minLength(1)],
      quantity: ['', Validators.minLength(1)],
      kind: ['', Validators.nullValidator],
      copyright: [''],
      publisher: [''],
      edition: [''],
      description: [''],
      image: [''],

    });
  }
  
  checkSelected(){
    var e = document.getElementById("kind") as HTMLSelectElement;
    this.newBook.kind = e.options[e.selectedIndex].value;
  }

  open(content, id) {
  
    this.modalService.open(content,
   { size: 'lg', backdrop: 'static', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => 
      {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.bookService.getABook(id).subscribe((res) => {
      this.book = res;
      this.showDetailBook(this.book);
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  selectImage(event:any) {
    this.selected_image = true;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.book_image = file;
    
      (document.getElementById("showImage") as HTMLSelectElement).setAttribute('src', window.URL.createObjectURL(event.target.files[0]));

    }
  }
  
  showDetailBook(item)
  {
    (document.getElementById('title') as HTMLSelectElement).value = item.title ; 
    (document.getElementById('author') as HTMLSelectElement).value = item.author ; 
    (document.getElementById('price') as HTMLSelectElement).value = item.price ; 
    (document.getElementById('quantity') as HTMLSelectElement).value = item.quantity ; 
    (document.getElementById('edition') as HTMLSelectElement).value = item.edition ; 
    (document.getElementById('copyright') as HTMLSelectElement).value = item.copyright ; 
    (document.getElementById('publisher') as HTMLSelectElement).value = item.publisher ; 
    (document.getElementById('description') as HTMLSelectElement).value = item.description ; 
    (document.getElementById("kind") as HTMLInputElement).value = item.kind;
    this.book_image = item.image;

  }

  update() {

    this.isFormSubmitted = true;
    this.checkSelected();

    const formData = new FormData();
    formData.append('_id', this.book._id);
    formData.append('title',  (document.getElementById('title') as HTMLSelectElement).value);
    formData.append('author',  (document.getElementById('author') as HTMLSelectElement).value);
    formData.append('description',  (document.getElementById('description') as HTMLSelectElement).value);
    formData.append('price', (document.getElementById('price') as HTMLSelectElement).value);
    formData.append('file', this.book_image);
    formData.append('kind', (document.getElementById('kind') as HTMLSelectElement).value);
    formData.append('quantity', (document.getElementById('quantity') as HTMLSelectElement).value);
    formData.append('publisher', (document.getElementById('publisher') as HTMLSelectElement).value);
    formData.append('copyright', (document.getElementById('copyright') as HTMLSelectElement).value);
    formData.append('edition', (document.getElementById('edition') as HTMLSelectElement).value);


    if (this.editBookForm.invalid) {
      return;
    }

    if (this.selected_image)
    {
      this.bookService.updateBook(formData);

    }else{
      this.bookService.updateABook(formData);

    }

    Swal.fire('Success!', 'Updated Book Successfully!', 'success')
    this.refesh();
    this.selected_image = false;
  }

  delete(item){
    console.log(item);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to resolve this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5E50F9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.deleteBook(item);
        this.refesh();

        Swal.fire(
          'Deleted!',
          'Book has been deleted.',
          'success'
        )
      }
    })
     
  }
}

import { Pipe, PipeTransform } from '@angular/core';
