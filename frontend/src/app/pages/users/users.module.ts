

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './adduser/adduser.component';
import { ViewUsersComponent } from './viewusers/viewusers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  { path: 'add_user', component: AddUserComponent },
  { path: 'view_users', component: ViewUsersComponent },
]

@NgModule({
  declarations: [
    AddUserComponent,
    ViewUsersComponent
],
imports: [
  CommonModule,
  FormsModule,
  RouterModule.forChild(routes),
  ReactiveFormsModule,
  Ng2SearchPipeModule
]

})
export class UsersModule { }