import { Injectable,Injector} from '@angular/core';
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    //let authService = this.injector.get(AuthService);
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(currentUser.token);
    if(currentUser && currentUser.token){
        req = req.clone({
        setHeaders : {
          Authorization : `Bearer${currentUser.token}`
        }
          });
    }
       
    return next.handle(req);
  }
}
