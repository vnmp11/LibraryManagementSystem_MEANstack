import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './layout/admin/admin.component';
import { HomeComponent } from './layout/home/home.component';
import { UserComponent } from './layout/user/user.component';
import { LoginComponent } from './pages/login/login.component';


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

    ]
  },

  {
    path: 'login', component: LoginComponent,
  },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },

];

@NgModule({

  imports: [RouterModule.forRoot(routes),
    CommonModule,
    FormsModule
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
