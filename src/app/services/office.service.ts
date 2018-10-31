import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';

import {map} from 'rxjs/operators'; 
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

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
        this.urlOffice = environment.urlOffice;
    }
    
    getOffices(){
        return this.http.get<any>(this.urlOffice);    
    }
}