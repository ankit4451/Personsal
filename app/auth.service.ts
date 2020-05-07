import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { throwError, Observable} from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Router } from '@angular/router';

import { LoginUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   _loginurl = '';

   userData: any;
   userToken: any;
   //userJson: any;

  
  constructor(private _http: HttpClient,
    private router: Router) { 
    }

  ErrorHandler(error: HttpErrorResponse){
    return throwError(error);
  }

  login(user: LoginUser){
    return this._http.post<any>(this._loginurl,user)
               .pipe(catchError(this.ErrorHandler))
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }
  
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

   
}
