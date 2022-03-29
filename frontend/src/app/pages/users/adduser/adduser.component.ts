import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AddUserComponent implements OnInit {
  
  constructor( private userService: UserService){
    userService.getUser().subscribe(data=>{
      console.log(data);
      this.arrUser = data;
    });
  }

  ngOnInit() {
  }

  
form!: FormGroup;

public newUser = {email:'', password:'', name:'', phone:'', _id:"", image:"", address:"",dob:'', sex:''};
image: any;

//day la list User
arrUser:any = []

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

  alert(this.newUser.name);

  this.check();

  console.log(this.newUser);

  this.userService.addUser(this.newUser);

 
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

}
