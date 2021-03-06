import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [ 
  {
    path: 'login' , component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path :'home' , component: HomeComponent
    //canActivate: [AuthGuard]
  },
  {
    path: 'setPassword/:id' , component: SetPasswordComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
