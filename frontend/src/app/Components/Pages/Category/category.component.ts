import { Component } from "@angular/core";
import { provideRoutes } from "@angular/router";
import { CategoryService } from "src/app/Servies/category.module";

@Component({
  templateUrl: 'category.component.html',
  selector: 'category',
  providers: [CategoryService]
})
export class CategoryComponent{

  enter = [];


  arrCate:any = []


  constructor(private cateService:CategoryService){

    cateService.getCategory().subscribe(data=>{
      console.log(data);
      this.arrCate = data;
    });
  }


}
