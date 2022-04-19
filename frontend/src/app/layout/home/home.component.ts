import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbDropdownConfig]

})
export class HomeComponent implements OnInit {

    title = 'demo1';

  
    constructor() {
  
    }

  ngOnInit() {
   
  }


}