import { Component, OnInit } from "@angular/core";
import { provideRoutes } from "@angular/router";
import { UserService } from "src/app/Servies/user.module";
import { FormGroup } from "@angular/forms";
import { JQueryStyleEventEmitter } from "rxjs/internal/observable/fromEvent";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  providers: []
})


export class UserComponent implements OnInit {

form!: FormGroup;

    public newUser = {email:'', password:'', name:'', phone:'', _id:"", image:"", address:"",dob:'', sex:''};
    image: any;

    //day la list User
    arrUser:any = []

    constructor( private userService: UserService){
      userService.getUser().subscribe(data=>{
        console.log(data);
        this.arrUser = data;
      });
    }

    ngOnInit(){}

    check(){

      const checkNam = document.getElementById("nam") as HTMLInputElement;
      const checkNu = document.getElementById("nu") as HTMLInputElement;

      if(checkNam.checked== true) {
        this.newUser.sex = "Male";
      }else if(checkNu.checked == true) {
        this.newUser.sex = "Female";
      }else{
        this.newUser.sex = "Other";
      }
    }

    post() {

     this.check();

     //alert(this.newUser.sex);

      console.log(this.newUser);
      this.userService.addUser(this.newUser);
      //alert(this.newUser.sex);
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


    selectImage(event:any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.image = file;
      }
    }

    onSubmit(){
      const formData = new FormData();
      formData.append('file', this.image);
      this.userService.testanh(formData);
    }

  }




