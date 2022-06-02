
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BorrowService } from 'src/app/service/borrow.service';
import { CategoryService } from 'src/app/service/category.service';
import { ReturnService } from 'src/app/service/return.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewBorrow',
  templateUrl: './viewBorrow.component.html',
  styleUrls: ['./viewBorrow.component.scss']
})
export class ViewBorrowComponent implements OnInit {

  arrBorrow:any = []
  closeResult = '';
  public newReturn = {idBorrow:'', note:''};
  max:any;
  borrowId:any;
  user:any;

  constructor(  private returnService: ReturnService, private borrowService: BorrowService, private userService: UserService, public datepipe: DatePipe,  private modalService: NgbModal){
      borrowService.getBorrow().subscribe(data=>{
        console.log(data);
        this.arrBorrow = data;
      });

      
  }

  ngOnInit() {
      this.max = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  }

  open(content, id) {
    this.modalService.open(content,
   { size: 'md', backdrop: 'static', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => 
      {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.borrowId = id;
 
  }

  openSendEmail(content, id, id_user) {
    this.modalService.open(content,
   { size: 'md', backdrop: 'static', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => 
      {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.borrowId = id;
    

    this.userService.getAUser(id_user).subscribe(data=>{
      console.log(data);
      this.user = data;
      (document.getElementById('email') as HTMLSelectElement).value =  this.user.email ; 

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

  
  post() {
    this.newReturn.idBorrow = this.borrowId;
    this.newReturn.note = (document.getElementById('note') as HTMLSelectElement).value;
    
    console.log(this.newReturn);
    this.returnService.addReturn(this.newReturn);
    
    Swal.fire('Success!', 'Returned Book Successfully!', 'success')
    this.refesh();
  }

  refesh(){
    this.borrowService.getBorrow().subscribe(data=>{
      console.log(data);
      this.arrBorrow = data;
    });  
  }


}