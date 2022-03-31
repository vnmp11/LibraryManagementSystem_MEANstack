import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CategoryComponent } from "./category/category.component";

const routes: Routes = [
  { path: 'category', component: CategoryComponent },
]

@NgModule({
  declarations: [
    CategoryComponent,
],
imports: [
  CommonModule,
  FormsModule,
  RouterModule.forChild(routes),
  ReactiveFormsModule
]
})
export class ItemsModule { }