import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AddUserComponent implements OnInit {
  
  constructor( private userService: UserService, private formBuilder: FormBuilder){
    userService.getUser().subscribe(data=>{
      console.log(data);
      this.arrUser = data;
    });
  }

  ngOnInit() {
    const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";

    this.addUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(PAT_EMAIL)]],
      name: ['', Validators.required],
      role: ['', Validators.required],
      address: [''],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  
  form!: FormGroup;
  addUserForm: FormGroup;

  public newUser = {email:'', password:'', name:'', phone:'', _id:"", image:"", address:'', dob:'', sex:'', role:''};
  image: any;
  isFormSubmitted = false;

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

    this.check();
    this.checkSelected();

    this.userService.addUser(this.newUser);
    Swal.fire('Success!', 'Added User Successfully!', 'success')

    this.resetForm();

  }

  update() {

    this.check();

    const formData = new FormData();
    formData.append('_id', this.newUser._id);
    formData.append('file', this.image);
    formData.append('email', this.newUser.email);
    formData.append('password', this.newUser.password);
    formData.append('name', this.newUser.name);
    formData.append('phone', this.newUser.phone);
    formData.append('dob', this.newUser.dob);
    formData.append('sex', this.newUser.sex);
    formData.append('address', this.newUser.address);

    console.log(formData);
    this.userService.updateUser(formData);
  }

  delete(){
    console.log(this.newUser);
    this.userService.deleteUser(this.newUser);
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
    this.userService.testanh(formData);
  }

  resetForm()
  {
    (document.getElementById("name") as HTMLInputElement).value = "";
    (document.getElementById("phone") as HTMLInputElement).value = "";
    (document.getElementById("address") as HTMLInputElement).value = "";
    (document.getElementById("email") as HTMLInputElement).value = "";
    (document.getElementById("password") as HTMLInputElement).value = "";
    (document.getElementById("Other") as HTMLInputElement).checked = true;
    (document.getElementById("dob") as HTMLInputElement).value = null;
  }
}
