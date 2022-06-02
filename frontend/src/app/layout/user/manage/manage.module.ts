import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReturningComponent } from './returning/return.component';
import { BorrowingComponent } from './borrowing/borrow.component';

const routes: Routes = [
  { path: 'borrowing', component: BorrowingComponent },
  { path: 'returning', component: ReturningComponent },

]

@NgModule({
  declarations: [
    BorrowingComponent,
  ReturningComponent

],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageModule { }
