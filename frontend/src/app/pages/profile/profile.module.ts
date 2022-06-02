import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { UpdateDetailComponent } from './updatedetail/updatedetail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  { path: 'change_password', component: ChangePasswordComponent },
  { path: 'update_detail', component: UpdateDetailComponent },

]

@NgModule({
  declarations: [
  ChangePasswordComponent,
  UpdateDetailComponent

],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ]
})
export class ProfileModule { }
