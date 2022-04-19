import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { BooksModule } from 'src/app/pages/books/books.module';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule, 
    BooksModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    RouterModule,
    HttpClientModule,
  ],

  providers: [],
  bootstrap: [AdminComponent]
})
export class AdminModule { }