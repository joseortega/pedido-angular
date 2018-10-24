import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

import {UserService} from '../services/user.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available    
        let currentUser = this.auth.getCurrentUser();
        if (currentUser && currentUser.token) {
            
            request = request.clone({
                setHeaders: { 
                    Authorization: currentUser.token
                }
            });
        }

        return next.handle(request);
    }
}