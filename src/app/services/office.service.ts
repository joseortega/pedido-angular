import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';

import {map} from 'rxjs/operators'; 
import {Observable} from 'rxjs';
import {GLOBAL} from './global';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class OfficeService{
    public urlOffice: string;
    private handleError: HandleError;
    
    constructor(
        private http: HttpClient,
        private httpErrorHandler: HttpErrorHandler){
        
        this.handleError = httpErrorHandler.createHandleError('OfficeService');
        this.urlOffice = GLOBAL.urlOffice;
    }
    
    getOffices(){
        return this.http.get<any>(this.urlOffice);    
    }
}