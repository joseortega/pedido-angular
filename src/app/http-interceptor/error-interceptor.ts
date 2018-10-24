import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router, ActivatedRoute, Params, ParamMap} from '@angular/router';

import {UserService} from '../services/user.service';
import {NotifierService} from 'angular-notifier';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    private readonly notifier: NotifierService; 
    
    constructor(private authenticationService: UserService, private route: ActivatedRoute, private router: Router, private notifierService: NotifierService) {
        
        this.notifier = notifierService;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {
            const currentUser = this.authenticationService.getCurrentUser();
                        
            if (error.status === 401) {
                if (currentUser && currentUser.token){
                    // auto logout if 401 response returned from api
                    this.authenticationService.logout();
                    this.router.navigate(['/login']);
                    
                    this.notifier.notify('error', error.error.message);
                }
            }   
                   
            return throwError(error);
        }))
    }
}