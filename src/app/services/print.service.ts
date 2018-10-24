import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';

import {map} from 'rxjs/operators'; 
import {Observable} from 'rxjs';
import {Purchase} from '../model/purchase';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { catchError } from 'rxjs/operators';
import {PurchaseStatus} from '../model/purchase-status';

//pdf Report
declare var jsPDF: any; // Important

@Injectable()
export class PrintService{
    private handleError: HandleError;
    
    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler){  
    }
    
    printRequestPurchase(purchase: Purchase, purchaseItems){
                
        var doc = new jsPDF();
        
        doc.text(105, 22, 'COAC Semilla del Progreso', null, null, 'center');
        doc.text(105, 30, 'Orden de Pedido', null, null, 'center');
        
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(14, 40, 'Oficina: ' + purchase.office.name);
        doc.text(14, 46, 'Usuario (Solicitud): ' + purchase.user.username);
        doc.text(14, 52, 'Estado de Solitud: ' + purchase.status);
        doc.text(14, 58, 'Fecha de Solicitud: ' + purchase.request_date);
        
        var columns = [];
        var rows = [];
        
        columns = ["Nombre Item", "Cant. Solicitada"];

        for (let purchaseItem of purchaseItems){
          rows.push([purchaseItem.product.name, 
                     purchaseItem.request_quantity]);  
         }
        
        doc.autoTable(columns, rows, {startY: 66, showHeader: 'firstPage'});
        doc.save('pedido.pdf');
    }
    
    printDispatchedPurchase(purchase: Purchase, purchaseItems){
        
        var doc = new jsPDF();
        
        doc.text(105, 22, 'COAC Semilla del Progreso', null, null, 'center');
        doc.text(105, 30, 'Orden de Pedido', null, null, 'center');
        
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(14, 40, 'Oficina: ' + purchase.office.name);
        doc.text(14, 46, 'Usuario (Solicitud): ' + purchase.user.username);
        doc.text(14, 52, 'Estado de Solitud: ' + purchase.status);
        doc.text(14, 58, 'Fecha de Solicitud: ' + purchase.request_date);
        doc.text(14, 64, 'Fecha de Despacho: ' + purchase.dispatch_date);
        doc.text(14, 70, 'Usuario (Respuesta): ' + purchase.user_response.username);
        
        var columns = [];
        var rows = [];
        
        columns = ["Nombre Item", "Cant. Solicitada", "Cant. Despachada"];

        for (let purchaseItem of purchaseItems){
         rows.push([purchaseItem.product.name, 
                    purchaseItem.request_quantity,
                    purchaseItem.dispatch_quantity]);  
        }
        
        doc.autoTable(columns, rows, {startY: 78, showHeader: 'firstPage'});
        doc.save('pedido.pdf');
    }
    
    printCanceledPurchase(purchase: Purchase, purchaseItems){
                
        var doc = new jsPDF();
        
        doc.text(105, 22, 'COAC Semilla del Progreso', null, null, 'center');
        doc.text(105, 30, 'Orden de Pedido', null, null, 'center');
        
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(14, 40, 'Oficina: ' + purchase.office.name);
        doc.text(14, 46, 'Usuario: ' + purchase.user.username);
        doc.text(14, 52, 'Estado de Solitud: ' + purchase.status);
        doc.text(14, 58, 'Fecha de Solicitud: ' + purchase.request_date);
        doc.text(14, 64, 'Fecha de Anulado: ' + purchase.canceled_date);
        doc.text(14, 70, 'Usuario (Respuesta): ' + purchase.user_response.username);
        
        var columns = [];
        var rows = [];
        
        columns = ["Nombre Item", "Cant. Solicitada"];

        for (let purchaseItem of purchaseItems){
          rows.push([purchaseItem.product.name, 
                     purchaseItem.request_quantity]);  
         }
        
        doc.autoTable(columns, rows, {startY: 78, showHeader: 'firstPage'});
        doc.save('pedido.pdf');
    }
    
    printPurchase(purchase: Purchase, purchaseItems){
        if (purchase.status == PurchaseStatus.REQUEST_STATUS){
            this.printRequestPurchase(purchase, purchaseItems);
        } else if (purchase.status == PurchaseStatus.DISPATCHED_STATUS){
            this.printDispatchedPurchase(purchase, purchaseItems);
        }else{
            this.printCanceledPurchase(purchase, purchaseItems);
        }
    }
}

