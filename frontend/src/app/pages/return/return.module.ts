import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { AddBookComponent } from "../books/addbook/addbook.component";
import { ReturnComponent } from "./return.component";

const routes: Routes = [
  { path: '', component: ReturnComponent },

]

@NgModule({
  declarations: [
    ReturnComponent,
],
imports: [
  CommonModule,
  FormsModule,
  RouterModule.forChild(routes),
  ReactiveFormsModule,
  Ng2SearchPipeModule
]
})
export class ReturnModule { }