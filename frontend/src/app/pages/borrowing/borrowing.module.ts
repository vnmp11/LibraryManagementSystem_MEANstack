import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { AddBookComponent } from "../books/addbook/addbook.component";
import { AddBorrowComponent } from "./addborrow/addborrow.component";
import { ViewBorrowComponent } from "./viewborrow/viewborrow.component";

const routes: Routes = [
  { path: 'add_borrow', component: AddBorrowComponent },
  { path: 'view_borrow', component: ViewBorrowComponent },

]

@NgModule({
  declarations: [
    AddBorrowComponent,
    ViewBorrowComponent
],
imports: [
  CommonModule,
  FormsModule,
  RouterModule.forChild(routes),
  ReactiveFormsModule,
  Ng2SearchPipeModule
]
})
export class BorrowingModule { }