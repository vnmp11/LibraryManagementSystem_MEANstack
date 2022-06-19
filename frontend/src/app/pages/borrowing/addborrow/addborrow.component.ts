
import { DatePipe } from '@angular/common';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from 'src/app/service/book.service';
import { BorrowService } from 'src/app/service/borrow.service';
import { CategoryService } from 'src/app/service/category.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addBorrow',
  templateUrl: './addBorrow.component.html',
  styleUrls: ['./addBorrow.component.scss']
})
export class AddBorrowComponent implements OnInit {

  addBorrowigForm: FormGroup;
  arrBook:any = [];
  book:any;
  bookID:any;
  idUser:any;
  arrUser:any = []
  user: any;

  searchTerm = '';
  term = '';

  maxdate:Date;
  returndate:Date;
  max:any;
  return:any;
  check = true;

  public newBorrow = {idBook:'', idUser:''};

  constructor(private bookService: BookService, private userService: UserService, public datepipe: DatePipe, private borrowService: BorrowService) { 
    bookService.getBook().subscribe(data=>{
      console.log(data);
      this.arrBook = data;
    });

    userService.getUser().subscribe(data=>{
      console.log(data);
      this.arrUser = data;
    });
  }

  ngOnInit() {
    this.idUser = (document.getElementById('idUser') as HTMLSelectElement).value;

    this.maxdate = new Date();
    this.returndate = new Date(new Date().setDate(new Date().getDate() + 30)); 
    this.max = this.datepipe.transform(this.maxdate, 'yyyy-MM-dd');
    this.return = this.datepipe.transform(this.returndate, 'yyyy-MM-dd');
  }

  findBooks() {
    var find_id = (document.getElementById('idBook') as HTMLSelectElement).value;
    this.book = this.arrBook.find(x => x._id == find_id);
    if (this.book) {
      (document.getElementById('titleBook') as HTMLSelectElement).value = this.book.title;
    }
    else {
      (document.getElementById('titleBook') as HTMLSelectElement).value = ' ';
    }
  }

  findUsers() {
    var find_id = (document.getElementById('idUser') as HTMLSelectElement).value;

    this.user = this.arrUser.find(x => x._id == find_id);

    if (this.user) {
      (document.getElementById('nameUser') as HTMLSelectElement).value = this.user.name;
    }
    else {
      (document.getElementById('nameUser') as HTMLSelectElement).value = ' ';
    }
  }

  updateDate()
  {
    // let max = (document.getElementById('maxdate') as HTMLSelectElement).value;
    // alert(max);
    // this.returndate = new Date(new Date().setDate(max.getDate() + 30)); 
    // this.return = this.datepipe.transform(this.returndate, 'yyyy-MM-dd');
  
  }


  post() {
    this.newBorrow.idBook = (document.getElementById('idBook') as HTMLSelectElement).value;
    this.newBorrow.idUser = (document.getElementById('idUser') as HTMLSelectElement).value;
    
    console.log(this.newBorrow);
    this.borrowService.addBorrow(this.newBorrow);
    this.resetForm();
    Swal.fire('Success!', 'Added Borrowing Successfully!', 'success')

  }

  resetForm()
  {
    this.check = false;
    (document.getElementById("idBook") as HTMLInputElement).value = " ";
    (document.getElementById("idUser") as HTMLInputElement).value = " ";
    (document.getElementById("nameUser") as HTMLInputElement).value = " ";
    (document.getElementById("titleBook") as HTMLInputElement).value = " ";
    (document.getElementById("maxdate") as HTMLInputElement).value = null;
    (document.getElementById("returnDate") as HTMLInputElement).value = null;

  }



}
