import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';
import { TodolistComponent } from './todolist/todolist.component';
import { SharedlistComponent } from './sharedlist/sharedlist.component';
import { noauthGuard } from './guards/noauth.guard';
import { NewListComponent } from './new-list/new-list.component';

const routes: Routes = [
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'publiclist',
    component: TodolistComponent
  },
  {
    path:'mylist',
    canActivate:[noauthGuard],
    component: TodolistComponent
  },
  {
    canActivate:[noauthGuard],
    path:'sharedlist',
    component: SharedlistComponent
  },
  {
    canActivate:[noauthGuard],
    path:'newlist',
    component:NewListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
