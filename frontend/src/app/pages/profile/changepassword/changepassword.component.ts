import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordService } from 'src/app/service/changePassword.service';
import Swal from 'sweetalert2';
import { PWChangeValidators } from './password_validators';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  currentUser:any;
  pwChangeForm: FormGroup;
  addUserForm: FormGroup;
  isFormSubmitted = false;
 
  constructor(private router: Router, private formBuilder: FormBuilder, private passwordService:ChangePasswordService) {
    this.currentUser = history.state;
  }

  ngOnInit() {
    const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";

    this.addUserForm = this.formBuilder.group({
      confirm: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  
  form!: FormGroup;


  public newUser = {email:'', password:'',confirm:'', name:'', phone:'', _id:"", image:"", address:'', dob:'', sex:'', role:''};
  image: any;

  public newPass = {_id:'', password:''};


  //day la list User
  arrUser:any = []
  checkSelected(){
    var e = document.getElementById("role") as HTMLSelectElement;
    this.newUser.role = e.options[e.selectedIndex].value;
  }

  check(){

    const checkMale = document.getElementById("Male") as HTMLInputElement;
    const checkFemale = document.getElementById("Female") as HTMLInputElement;

    if(checkMale.checked== true) {
      this.newUser.sex = "Male";
    }else if(checkFemale.checked == true) {
      this.newUser.sex = "Female";
    }else{
      this.newUser.sex = "Other";
    }
  }

  post() {

    this.isFormSubmitted = true;

    // Return if form is invalid
    if (this.addUserForm.invalid) {
      return;
    }

    this.newPass._id = this.currentUser._id;
    this.newPass.password = (document.getElementById("confirm") as HTMLInputElement).value;

    alert("newpass: "+ this.newPass.password);
    alert("id: "+ this.newPass._id);
    this.passwordService.changePass(this.newPass)
    Swal.fire('Success!', 'Changed Password Successfully!', 'success')

    this.resetForm();

  }




// selectImage(event:any) {
//   if (event.target.files.length > 0) {
//     const file = event.target.files[0];
//     this.image = file;
//   }
// }

  HandleBrowseClick()
  {
    var fileinput = document.getElementById("browse");
    fileinput.click();
  }

  Handlechange()
  {
  var fileinput = document.getElementById("browse");
  var textinput = document.getElementById("filename");
  
  (textinput as HTMLInputElement).value = (fileinput as HTMLInputElement).value;

  this.image = fileinput;

  }

  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.image);
  }

  resetForm()
  {
    (document.getElementById("password") as HTMLInputElement).value = "";
    (document.getElementById("confirm") as HTMLInputElement).value = "";
  }


}
