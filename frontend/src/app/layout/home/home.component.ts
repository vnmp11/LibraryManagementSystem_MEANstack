import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from 'src/app/service/book.service';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbDropdownConfig]

})
export class HomeComponent implements OnInit {

  title = 'demo1';
  closeResult = ''
  arrBook:any = [];
  book:any;
  error:any;
  currentUser:any;
  errorShow = false;
  user:any
  
  constructor( private userService: UserService, private route: Router, private loginService: LoginService, private modalService: NgbModal, private bookService: BookService) {

    bookService.getBook().subscribe(data=>{
      console.log(data);
      this.arrBook = data;
    });


    this.currentUser = this.route.getCurrentNavigation().extras.state; // GET DATA
   

  }

  ngOnInit() {
    this.errorShow = false;
  }

  public newLogin = {email:'', password:''};

  post() {
    this.newLogin.email = (document.getElementById('email') as HTMLSelectElement).value;
    this.newLogin.password = (document.getElementById('password') as HTMLSelectElement).value;

    console.log(this.newLogin);
    this.loginService.login(this.newLogin).subscribe(data => {
      this.currentUser = data;
      //this.route.navigateByUrl("/admin");
      this.modalService.dismissAll();
      Swal.fire('Success!', 'Logged In Successfully!', 'success')
    }, error => {
      //alert(error.status)
      // if (error.status == 200)
      // {        
      //   this.route.navigateByUrl("/admin");
      //   this.modalService.dismissAll();
      //   Swal.fire('Success!', 'Logged In Successfully!', 'success')
      // }
       if (error.status == 400)
      {
        this.errorShow = true;
      }
      else
      {
       }

    });
   
  }

  checkRole() {
    if (this.currentUser.role == 'Reader')
    {
      this.route.navigate(['/','user'], { state: this.currentUser  });
    }
    else if (this.currentUser.role == 'Librarian'){
      this.route.navigate(['/','admin'], { state: this.currentUser  });
    }
  }

  toggleText() {
    var points = 
        document.getElementById("points");

    var showMoreText =
        document.getElementById("moreText");

    var buttonText =
        document.getElementById("textButton");

    if (points.style.display === "none") {

        showMoreText.style.display = "none";
        points.style.display = "inline";
        buttonText.innerHTML = "Show More";
    }

    else {

        showMoreText.style.display = "inline";
        points.style.display = "none";
        buttonText.innerHTML = "Show Less";
    }
  }

  open(content, id) {
  
    this.modalService.open(content,
   {  backdrop: 'static', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => 
      {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.bookService.getABook(id).subscribe((res) => {
      this.book = res;
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

}