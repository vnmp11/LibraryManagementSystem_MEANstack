import { Component, OnInit } from '@angular/core';
import { BorrowService } from 'src/app/service/borrow.service';
import { ReturnService } from 'src/app/service/return.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.scss']
})
export class BorrowingComponent implements OnInit {
 //day la list Return
 arrBorrow:any = []
 currentUser:any;

 borrowId = {idUser:''}

  
  constructor(  private returnService: ReturnService, private borrowService: BorrowService){
    this.currentUser = history.state;
    this.borrowId.idUser = this.currentUser._id;
     returnService.getReturnID(this.borrowId).subscribe(data => {
       this.arrBorrow = data;
    });
  }


  ngOnInit() {
  }
}
