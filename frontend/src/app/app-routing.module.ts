import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";
import { CategoryComponent } from "./Components/Pages/Category/category.component";
import { HomeComponent } from "./Components/Pages/Home/home.component";
import { UserComponent } from "./Components/Pages/User/user.component";
import { BookComponent } from "./Components/Pages/Book/book.component";

const routesConfig:Routes=[
  {path:'user', component: UserComponent},
  {path: 'category',component: CategoryComponent},
  {path: 'book',component: BookComponent},
  {path:'**',component: HomeComponent}
]

@NgModule({

  declarations: [
    CategoryComponent, HomeComponent,UserComponent,BookComponent
  ],
  imports:[
    RouterModule.forRoot(routesConfig),
    CommonModule,
    FormsModule
  ],
  exports:  [RouterModule]
})
export class AppRoutingModule{}
