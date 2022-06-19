import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import { BorrowService } from '../service/borrow.service';
import { CategoryService } from '../service/category.service';
import { CountService } from '../service/count.service';
import { ReturnService } from '../service/return.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  arrBorrow:any = []
  arrReturn:any = []
  arrUser:any = []
  arrCate:any = [];
  arrBook:any = [];
  arrCount:any = [];

  total:any = [];
  total1:any;
  total2:any;
  total3:any;
  total4:any;
  total5:any;
  total6:any;
  total7:any;
  total8:any;
  total9:any;
  total10:any;
  total11:any;
  total12:any;

  totalFine:any;


  toggleProBanner(event) {
    console.log("123");
    event.preventDefault();
    document.querySelector('body').classList.toggle('removeProbanner');
  }

  constructor( private countService: CountService, private returnService: ReturnService, private cateService: CategoryService, private bookService: BookService, private borrowService: BorrowService,  private userService: UserService) { 
    borrowService.getBorrow().subscribe(data=>{
      console.log(data);
      this.arrBorrow = data;
    });
    
    countService.getCount().subscribe(data=>{
      console.log(data);
      this.arrCount = data;
    });

    bookService.getBook().subscribe(data=>{
      console.log(data);
      this.arrBook = data;
    });

    userService.getUser().subscribe(data=>{
      console.log(data);
      this.arrUser = data;
    });

    cateService.getCategory().subscribe(data=>{
      console.log(data);
      this.arrCate = data;
    });

    returnService.getReturn().subscribe(data=>{
      console.log(data);
      this.arrReturn = data;
 
    });

       
  }

  ngOnInit() {   
    
  this.visitSaleChartData =  [
  
    {
      label: 'Borrowing',
      data: [0, 0, 0, 0, 0, 0, 0, 0,0, 0,0, 0],
      borderWidth: 3,
      fill: false,
    },
    {
      label: 'Returing',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      borderWidth: 3,
      fill: false,
    }];


  }

  onClick(){
    this.countService.getCount().subscribe(data=>{
      console.log(data);
      this.arrCount = data;
    });

    this.total1 = this.arrCount.find(x => x.month == "1");
    this.total2 = this.arrCount.find(x => x.month == "2");
    this.total3 = this.arrCount.find(x => x.month == "3");
    this.total4 = this.arrCount.find(x => x.month == "4");
    this.total5 = this.arrCount.find(x => x.month == "5");
    this.total6 = this.arrCount.find(x => x.month == "6");
    this.total7 = this.arrCount.find(x => x.month == "7");
    this.total8 = this.arrCount.find(x => x.month == "8");
    this.total9 = this.arrCount.find(x => x.month == "9");
    this.total10 = this.arrCount.find(x => x.month == "10");
    this.total11 = this.arrCount.find(x => x.month == "11");
    this.total12 = this.arrCount.find(x => x.month == "12");

    this.visitSaleChartData =  [
  
      {
        label: 'Borrowing',
        data: [this.total1.borrow, this.total2.borrow, this.total3.borrow, this.total4.borrow, this.total5.borrow, this.total6.borrow, this.total7.borrow, this.total8.borrow, this.total9.borrow, this.total10.borrow, this.total11.borrow, this.total12.borrow],
        borderWidth: 3,
        fill: false,
      },
      {
        label: 'Returing',
        data: [this.total1.return, this.total2.return, this.total3.return, this.total4.return, this.total5.return, this.total6.return, this.total7.return, this.total8.return, this.total9.return, this.total10.return, this.total11.return, this.total12.return],
        borderWidth: 3,
        fill: false,
      }];
      

  }

  sumOfFine(){
   
    return this.arrReturn.map(t => t.fine).reduce((a , b) => a + b);
  }

  date: Date = new Date();

  visitSaleChartData : any[];

  visitSaleChartLabels = ["1", "2", "3", "4", "5", "6","7","8","9","10","11", "12"];

  visitSaleChartOptions = {
    responsive: true,
    legend: false,
    scales: {
        yAxes: [{
            ticks: {
                display: false,
                min: 0,
                stepSize: 5,
                max: 20
            },
            gridLines: {
              drawBorder: false,
              color: 'rgba(235,237,242,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            }
        }],
        xAxes: [{
            gridLines: {
              display:false,
              drawBorder: false,
              color: 'rgba(0,0,0,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            },
            ticks: {
                padding: 20,
                fontColor: "#9c9fa6",
                autoSkip: true,
            },
            categoryPercentage: 0.4,
            barPercentage: 0.4
        }]
      }
  };

  visitSaleChartColors = [
    {
      backgroundColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',

      ],
      borderColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ],
      borderColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ]
    },
  ];

  trafficChartData = [
    {
      data: [30, 30, 40],
    }
  ];

  trafficChartLabels = ["Search Engines", "Direct Click", "Bookmarks Click"];

  trafficChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    },
    legend: false,
  };

  trafficChartColors = [
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(132, 217, 210, 1)'
      ],
      borderColor: [
        'rgba(177, 148, 250, .2)',
        'rgba(254, 112, 150, .2)',
        'rgba(132, 217, 210, .2)'
      ]
    }
  ];

}
