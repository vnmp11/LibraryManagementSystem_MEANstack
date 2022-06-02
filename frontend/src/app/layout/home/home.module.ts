import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksModule } from 'src/app/pages/books/books.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';
import { NgxTextExpanderModule } from 'ngx-text-expander';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [HomeComponent],
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
    NgxTextExpanderModule,
    Ng2SearchPipeModule

  ],

})
export class HomeModule { }