import { Component, OnInit } from '@angular/core';
import { BorrowService } from 'src/app/service/borrow.service';
import { ReturnService } from 'src/app/service/return.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {
 //day la list Return
 arrReturn:any = []

 constructor( private returnService: ReturnService){
   returnService.getReturn().subscribe(data=>{
     console.log(data);
     this.arrReturn = data;

   });
 }

  ngOnInit() {
  }
}
