import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.scss']
})
export class ViewUsersComponent implements OnInit {

  form!: FormGroup;
  viewUserForm: FormGroup;

  public newUser = {email:'', password:'', name:'', phone:'', _id:"", image:"", address:'', dob:'', sex:''};
  image: any;
  user: any;
  dob: any;
  user_image: any;
  isFormSubmitted = false;

  selected_image = false;
  editUserForm: FormGroup;

  arrUser:any = []
  closeResult = '';

  constructor(private datePipe: DatePipe, private userService: UserService, private formBuilder: FormBuilder, private modalService: NgbModal) {
    userService.getUser().subscribe(data=>{
      console.log(data);
      this.arrUser = data;
    });
   }

  ngOnInit() {
    
  }

  refesh(){
    this.userService.getUser().subscribe(data=>{
      console.log(data);
      this.arrUser = data;
    });  
  }
  
  
  selectImage(event:any) {
    this.selected_image = true;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.user_image = file;
    
      (document.getElementById("showImage") as HTMLSelectElement).setAttribute('src', window.URL.createObjectURL(event.target.files[0]));

    }
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

    this.userService.getAUser(id).subscribe((res) => {
      this.user = res;
      this.showDetailUser(this.user);
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

  showDetailUser(item)
  {


    (document.getElementById('name') as HTMLSelectElement).value = item.name ; 
    (document.getElementById('phone') as HTMLSelectElement).value = item.phone ; 
    (document.getElementById('email') as HTMLSelectElement).value = item.email ;
    // (document.getElementById('dob') as HTMLSelectElement).value = item.dob;
    (document.getElementById('sex') as HTMLSelectElement).value = item.sex ; 
    (document.getElementById('role') as HTMLSelectElement).value = item.role ; 
    (document.getElementById('address') as HTMLSelectElement).value = item.address ; 
    this.user_image = item.image;

    this.dob = this.datePipe.transform(item.dob, 'dd/MM/yyyy');
    let str = this.dob;
    let dateEl = document.getElementById("dob");
    let value = str.split('/').reverse().join('-');
    
    (dateEl as HTMLSelectElement).value = value;

  }

  
  update() {

    this.isFormSubmitted = true;

    const formData = new FormData();
    formData.append('_id',this.user._id);
    formData.append('file', this.user_image);
    formData.append('email',(document.getElementById('email') as HTMLSelectElement).value);
    // formData.append('password', (document.getElementById('password') as HTMLSelectElement).value);
    formData.append('name',(document.getElementById('name') as HTMLSelectElement).value);
    formData.append('phone', (document.getElementById('phone') as HTMLSelectElement).value);
    formData.append('dob', (document.getElementById('dob') as HTMLSelectElement).value);
    formData.append('sex', (document.getElementById('sex') as HTMLSelectElement).value);
    formData.append('address', (document.getElementById('address') as HTMLSelectElement).value);

    if (this.selected_image)
    {
      alert("have image" +(document.getElementById('dob') as HTMLSelectElement).value);
      
      this.userService.updateUser(formData);

    }else{
      alert("no image"  + (document.getElementById('dob') as HTMLSelectElement).value);

      this.userService.updateAUser(formData);

    }

    Swal.fire('Success!', 'Updated User Successfully!', 'success')
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
        
        this.userService.deleteUser(item);
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
