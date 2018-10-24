import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GLOBAL} from './global';
import {User} from '../model/user';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { catchError, map, tap } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import {MessageService} from '../services/message.service';

@Injectable()
export class UserService{
    private url: string;
    private handleError: HandleError;
    
    constructor(private messageService: MessageService, private http: HttpClient, httpErrorHandler: HttpErrorHandler){
        this.handleError = httpErrorHandler.createHandleError('UserService');
        
        this.url = GLOBAL.urlLogin;
    }
    
    signup(user: User): Observable<any>{       
        return this.http.post<any>(this.url, user);
    }
    
    logout(){
      localStorage.removeItem('currentUser')
    }
    
    getCurrentUser(){
        return JSON.parse(localStorage.getItem('currentUser'));
    }
    
    getDecodeToken(){
        if(this.getCurrentUser()!=null){
            const helper = new JwtHelperService();
            return helper.decodeToken(this.getCurrentUser().token);

        }else{
            return null;
        }
    }
    
    getRoles(){
        if (this.getDecodeToken()!=null){
            return this.getDecodeToken().roles
        }
        
        return null;
    }
}

