import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxTextExpanderModule } from 'ngx-text-expander';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './layout/admin/admin.component';
import { HomeComponent } from './layout/home/home.component';
import { UserComponent } from './layout/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { ReturnComponent } from './pages/return/return.component';


const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  //Admin layout
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'books', loadChildren: () => import('./pages/books/books.module').then(m => m.BooksModule) },
      { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
      { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
      { path: 'items', loadChildren: () => import('./pages/items/items.module').then(m => m.ItemsModule) },     
      { path: 'borrowing', loadChildren: () => import('./pages/borrowing/borrowing.module').then(m => m.BorrowingModule) },
      { path: 'returning', loadChildren: () => import('./pages/return/return.module').then(m => m.ReturnModule) },
      { path: 'ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
      { path: 'mdi', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },


    ]
  },

  //Home layout
  {
    path: 'home', component: HomeComponent,
  },

  //User layout
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
      { path: 'manage', loadChildren: () => import('./layout/user/manage/manage.module').then(m => m.ManageModule) },

    ]
  },

  {
    path: 'login', component: LoginComponent,
  },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  { path: 'icon', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },

];

@NgModule({

  imports: [RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    NgxTextExpanderModule
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
