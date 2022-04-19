import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  arrCate:any = [];
  closeResult = '';
  isFormSubmitted = false;
  addCateForm: FormGroup;
  public newCate = {name:'', cate_id:''}

  constructor(private cateService: CategoryService, private modalService: NgbModal, private formBuilder: FormBuilder) { 
    cateService.getCategory().subscribe(data=>{
      console.log(data);
      this.arrCate = data;
    });
  }

  ngOnInit() {
    this.addCateForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  open(content) {
    
    this.modalService.open(content,
   { backdrop: 'static', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => 
      {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
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

  
  refesh(){
    this.cateService.getCategory().subscribe(data=>{
      this.arrCate = data;
    });  

    this.newCate.name = " ";

  }

  addCategory()
  {
    this.isFormSubmitted = true;

    if (this.addCateForm.invalid) {
      alert("error");
      return;
    }

    this.cateService.addCategory(this.newCate);
    Swal.fire('Success!', 'Added Category Successfully!', 'success')
    this.refesh();


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

        this.cateService.deleteCategory(item);
        this.refesh();

        Swal.fire(
          'Deleted!',
          'Category has been deleted.',
          'success'
        )
      }
    })


  }
}
