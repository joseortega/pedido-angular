import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators'; 
import {Observable} from 'rxjs';
import {GLOBAL} from './global';
import {Purchase} from '../model/purchase';

import {HttpErrorHandler, HandleError} from '../http-error-handler.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class PurchaseService{
    private urlPurchase: string;
    private handleError: HandleError;
    
    constructor(
        private http: HttpClient,
        private httpErrorHandler: HttpErrorHandler){
        
        this.handleError = httpErrorHandler.createHandleError('PurchaseService');
        this.urlPurchase = GLOBAL.urlPurchase;
    }
    
    getPurchaseList(page: number): Observable<any>{   
        return this.http.get<any>(this.urlPurchase + '?page=' + page);    
    }
    
    getPurchaseListRequest(page: number): Observable<any>{   
        return this.http.get<any>(this.urlPurchase+'-request' + '?page=' + page);    
    }
    
    getPurchaseDetail(purchaseId) {
        return this.http.get(this.urlPurchase +'/'+ purchaseId);    
    }
    
    addPurchase(purchase: Purchase): Observable<any>{        
        return this.http.post<any>(this.urlPurchase+'/create', purchase);
    }
    
    updatePurchase(purchase: Purchase): Observable<any>{
        return this.http.post<any>(this.urlPurchase + '/update/' + purchase.id, purchase);
    }
    
    deletePurchase(purchaseId: number): Observable<any>{
        return this.http.get<any>(this.urlPurchase + '/delete/' + purchaseId);
    }
    
    requestPurchase(purchaseId: number): Observable<any>{      
        return this.http.get<any>(this.urlPurchase + '/request/' + purchaseId);
    }
    
    dispatchPurchase(purchaseId: number): Observable<any>{
        return this.http.get<any>(this.urlPurchase + '/dispatch/' + purchaseId);
    }
    
    cancelPurchase(purchaseId: number): Observable<any>{
        return this.http.get<any>(this.urlPurchase + '/cancel/' + purchaseId);
    }
}

