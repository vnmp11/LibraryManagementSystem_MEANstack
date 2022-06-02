import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './updatedetail.component.html',
  styleUrls: ['./updatedetail.component.scss']
})
export class UpdateDetailComponent implements OnInit {

  currentUser:any;
  user:any;
  dob: any;
  user_image: any;

  selected_image = false;
  editUserForm: FormGroup;

  constructor(private router: Router, private datePipe: DatePipe, private userService: UserService,) {
    this.currentUser = history.state;

    this.userService.getAUser(this.currentUser._id).subscribe(data=>{
      console.log(data);
      this.user = data;
    });  


   }

  ngOnInit() {

    this.dob = this.datePipe.transform(this.currentUser.dob, 'dd/MM/yyyy');
    let str = this.dob;
    let dateEl = document.getElementById("dob");
    let value = str.split('/').reverse().join('-');
    
    (dateEl as HTMLSelectElement).value = value;
    (document.getElementById('sex') as HTMLSelectElement).value = this.currentUser.sex ; 

    this.userService.getAUser(this.currentUser._id).subscribe(data=>{
      console.log(data);
      this.user = data;
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

  update() {

    const formData = new FormData();
    formData.append('_id',this.currentUser._id);
    formData.append('file', this.user_image);
    formData.append('name',(document.getElementById('name') as HTMLSelectElement).value);
    formData.append('phone', (document.getElementById('phone') as HTMLSelectElement).value);
    formData.append('dob', (document.getElementById('dob') as HTMLSelectElement).value);
    formData.append('sex', (document.getElementById('sex') as HTMLSelectElement).value);
    formData.append('address', (document.getElementById('address') as HTMLSelectElement).value);

    if (this.selected_image)
    {      
      this.userService.updateUser(formData);
    }else
    {
      this.userService.updateAUser(formData);
    }

    Swal.fire('Success!', 'Updated User Successfully!', 'success')
    //this.refesh();
    // this.router.navigate(['/','user'], { state: this.user  });
   
    this.selected_image = false;

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      if (this.currentUser.role == "Librarian")
      {
        this.router.navigate(['/','admin'], { state: this.user  });

      }else if (this.currentUser.role == "Reader")
      {
      this.router.navigate(['/','user'], { state: this.user  });
      }
    });
  }

  refesh(){
    this.userService.getAUser(this.currentUser._id).subscribe(data=>{
      console.log(data);
      this.currentUser = data;
    });  
  }
}
