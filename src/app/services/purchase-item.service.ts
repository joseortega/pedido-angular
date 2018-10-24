import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';

import {map} from 'rxjs/operators'; 
import {Observable} from 'rxjs';
import {GLOBAL} from './global';
import {PurchaseItem} from '../model/purchaseItem';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PurchaseItemService{
    private urlPurchase: string;
    private handleError: HandleError;
    
    constructor(
               private http: HttpClient, 
               private httpErrorHandler: HttpErrorHandler){
               
        this.handleError = httpErrorHandler.createHandleError('PurchaseItemService');
        this.urlPurchase = GLOBAL.urlPurchase;
    }
   
    getPurchaseItems(purchaseId: number) { 
        return this.http.get(this.urlPurchase+'/'+purchaseId+'/items');    
    }
    
    create(purchaseItem: PurchaseItem, purchaseId: number): Observable<any>{
        return this.http.post<any>(this.urlPurchase + '/' + purchaseId + '/item/create', purchaseItem);
    }
    
    update(purchaseItem: PurchaseItem, purchaseId: number): Observable<any>{
        return this.http.post<any>(this.urlPurchase + '/' + purchaseId + '/item/update/' + purchaseItem.id, purchaseItem);
    }
    
    delete(purchaseItemId: number, purchaseId: number){
        return this.http.get<any>(this.urlPurchase + '/' + purchaseId + '/item/delete/' + purchaseItemId);
    }
}

