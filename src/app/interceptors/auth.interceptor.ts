import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(!this.userService.isTokenExpired){
      const accessToken = this.userService.getAccessToken();
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + accessToken
        }
      });
      return next.handle(request);
    }
    if(!this.userService.isLoggedIn){
      this.router.navigate(['/login']);
    }
    return next.handle(request); 
  }
}
