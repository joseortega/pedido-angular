import {Component, OnInit, Input} from '@angular/core';
import {Purchase} from '../../model/purchase';
import {PurchaseService} from '../../services/purchase.service';
import {UserService} from '../../services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PurchaseDetailComponent} from '../purchase-detail/purchase-detail.component';
import {PurchaseItemService} from '../../services/purchase-item.service';

import {PrintService} from '../../services/print.service';
import {NotifierService} from 'angular-notifier';
import {PurchaseStatus} from '../../model/purchase-status';

@Component({
  selector: 'app-purchase-send',
  templateUrl: './purchase-send.component.html',
  styleUrls: ['./purchase-send.component.css'],
  providers: [PurchaseService, UserService, PurchaseItemService, PrintService]
})
export class PurchaseSendComponent implements OnInit {
    
    @Input() purchases;
    @Input() purchase: Purchase;
    public purchaseItems;
    private readonly notifier: NotifierService;
    private purchaseStatus = PurchaseStatus;
    
    
    constructor(private route: ActivatedRoute, 
      private router: Router, 
      private purchaseService: PurchaseService, 
      private userService: UserService,
      public activeModal: NgbActiveModal,
      private modalService: NgbModal,
      private printService: PrintService,
      private purchaseItemService: PurchaseItemService,
      notifierService: NotifierService) {
      
        this.notifier = notifierService;
        }

  ngOnInit() {
      
      this.getPurchaseItems();
  }
  
  getPurchaseItems(){ 
        this.purchaseItemService.getPurchaseItems(this.purchase.id).subscribe(
          data => {
              this.purchaseItems = data;         
          },
          (error: HttpErrorResponse) =>{
              if (error.error instanceof Error) {
              //A client-side or network error occurred.				 
              console.log('An error occurred:', error.error.message);
            } else {
              //Backend returns unsuccessful response codes such as 404, 500 etc.				 
              console.log('Backend returned status code: ', error.status);
              console.log('Response body:', error.error);
            }  
          }
        );
    }
  
  dispatchPurchase(){
        this.purchaseService.dispatchPurchase(this.purchase.id).subscribe(
          response => {
              this.purchase = response.data;
              const ix = this.purchase ? this.purchases.findIndex(h => h.id === this.purchase.id) : -1;
              if (ix > -1) {this.purchases[ix] = this.purchase; }
              
              //notification
              this.notifier.notify('success', 'Solicitud Despachada');  
          },
          (error: HttpErrorResponse) =>{
              if (error.error instanceof Error) {
              //A client-side or network error occurred.				 
              console.log('An error occurred:', error.error.message);
            } else {
              //Backend returns unsuccessful response codes such as 404, 500 etc.				 
              console.log('Backend returned status code: ', error.status);
              console.log('Response body:', error.error);
            }  
          }
        );
    }
    
    cancelPurchase(){
        this.purchaseService.cancelPurchase(this.purchase.id).subscribe(
          response => {
              this.purchase = response.data;
              const ix = this.purchase ? this.purchases.findIndex(h => h.id === this.purchase.id) : -1;
              if (ix > -1) {this.purchases[ix] = this.purchase; }
              
              //notification
              this.notifier.notify('success', 'Solicitud Anulada');  
          },
          (error: HttpErrorResponse) =>{
              if (error.error instanceof Error) {
              //A client-side or network error occurred.				 
              console.log('An error occurred:', error.error.message);
            } else {
              //Backend returns unsuccessful response codes such as 404, 500 etc.				 
              console.log('Backend returned status code: ', error.status);
              console.log('Response body:', error.error);
            }  
          }
        );
    }
    
    printPurchase(){
        this.printService.printPurchase(this.purchase, this.purchaseItems);
    }

}
