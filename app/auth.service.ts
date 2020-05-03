import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { throwError, Observable} from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Router } from '@angular/router';

import { RegisterUser,LoginUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _registerurl = 'http://localhost:3000/register';
  _loginurl = '';
  constructor(private _http: HttpClient,
    private router: Router) { }

  // register(user: RegisterUser):Observable<RegisterUser>{
  //   let body = JSON.stringify(user);
  //   console.log(typeof body);
  //   return this._http.post<any>(this._registerurl,body)
  //              .pipe(catchError(this.ErrorHandler));
  // }

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

  getToken() {
    return localStorage.getItem('token')
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

   
}
