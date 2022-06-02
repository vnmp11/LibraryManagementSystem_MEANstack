import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { BorrowService } from 'src/app/service/borrow.service';
import { ReturnService } from 'src/app/service/return.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturningComponent implements OnInit {
 //day la list Return
 arrReturn:any = []
 currentUser:any;
 idUser:any;

 returnId = {idUser:''}

 constructor( private returnService: ReturnService){
  this.currentUser = history.state;
  this.returnId.idUser = this.currentUser._id;
   returnService.getReturnID(this.returnId).subscribe(data => {
     this.arrReturn = data;
  });

 }

  ngOnInit() {
  }
}
