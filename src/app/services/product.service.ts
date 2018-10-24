import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';

import {map} from 'rxjs/operators'; 
import {Observable} from 'rxjs';
import {GLOBAL} from './global';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProductService{
    public urlProduct: string;
    private handleError: HandleError;
    
    constructor(
        private http: HttpClient,
        private httpErrorHandler: HttpErrorHandler){
        
        this.handleError = httpErrorHandler.createHandleError('ProductService');
        this.urlProduct = GLOBAL.urlProduct;
    }
    
    getProductList(page: number): Observable<any>{  
        return this.http.get<any>(this.urlProduct + '?page='+ page);    
    }
    
    getSearch(query: string){  
        return this.http.get<any>(this.urlProduct+'/search' + '?query=' + query);   
    }
}