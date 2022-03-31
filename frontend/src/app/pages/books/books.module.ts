import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './addbook/addbook.component';
import { ViewBooksComponent } from './viewbooks/viewbooks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: 'add_book', component: AddBookComponent },
    { path: 'view_books', component: ViewBooksComponent },
]

@NgModule({
  declarations: [
    AddBookComponent,
    ViewBooksComponent
],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule 
  ]
})
export class BooksModule { }
