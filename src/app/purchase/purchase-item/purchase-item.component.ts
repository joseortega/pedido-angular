import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Purchase} from '../../model/purchase';
import {PurchaseItem} from '../../model/purchaseItem';
import {PurchaseItemService} from '../../services/purchase-item.service';
import {PurchaseService} from '../../services/purchase.service';
import {Product} from '../../model/product';
import {ProductService} from '../../services/product.service';
import {UserService} from '../../services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {PurchaseDetailComponent} from '../purchase-detail/purchase-detail.component';

import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

import { NotifierService } from 'angular-notifier';
import {PurchaseStatus} from '../../model/purchase-status';

@Component({
  selector: 'app-purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.css'],
  providers: [PurchaseItemService, UserService, ProductService, PurchaseService]
})


export class PurchaseItemComponent implements OnInit {
    
    @Input() private purchase: Purchase;
     private purchaseItems: any;
     private editPurchaseItem: PurchaseItem;
     private product: Product;
     private purchaseItem = new PurchaseItem();
     private readonly notifier: NotifierService;
     private purchaseStatus = PurchaseStatus;
  
    search = (text$: Observable<any>) =>
      text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          switchMap(term =>
              this.productService.getSearch(term).pipe(
              )
        ),
      );

      formatter = (x: {name: string}) => x.name;

    constructor(
      private route: ActivatedRoute, 
      private router: Router, 
      private activeModal: NgbActiveModal, 
      private purchaseItemService: PurchaseItemService, 
      private userService: UserService, 
      private productService: ProductService,
      private purchaseService: PurchaseService,
      private modalService: NgbModal,
      private notifierService: NotifierService){
      
          this.notifier = notifierService;
      }

    ngOnInit(){  
        this.getPurchaseItems();
    }
  
    closeModal() {
        this.activeModal.close('Modal Closed');
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
    
    onSubmit(){
        this.purchaseItem.product = this.product;
        this.purchaseItemService.create(this.purchaseItem, this.purchase.id).subscribe(
          response => {
              this.purchaseItem = response.data;
              this.purchaseItems.push(this.purchaseItem);  
              this.purchaseItem = new PurchaseItem();
              
              this.notifier.notify('success', response.message);        
          },
          (error: HttpErrorResponse) =>{
              if (error.error instanceof Error) {
              //A client-side or network error occurred.				 
              console.log('An error occurred:', error.error.message);
            } else {
              //Backend returns unsuccessful response codes such as 404, 500 etc.				 
              console.log('Backend returned status code: ', error.status);
              console.log('Response body:', error.error);
              this.notifier.notify('error', error.error.message);
            }  
          }
        );
    }
    
    edit(purchaseItem: PurchaseItem){
        this.editPurchaseItem = purchaseItem;
    }
    
    update(){
        if (this.editPurchaseItem){
            this.purchaseItemService.update(this.editPurchaseItem, this.purchase.id).subscribe(
              response => {
                  const ix = response.data ? this.purchaseItems.findIndex(h => h.id === response.data.id) : -1;
                  if (ix > -1) {this.purchaseItems[ix] = response.data; }
                  
                  this.notifier.notify('success', response.message);  
              },
              (error: HttpErrorResponse) =>{
                  if (error.error instanceof Error) {
                  //A client-side or network error occurred.				 
                  console.log('An error occurred:', error.error.message);
                } else {
                  //Backend returns unsuccessful response codes such as 404, 500 etc.				 
                  console.log('Backend returned status code: ', error.status);
                  console.log('Response body:', error.error);
                  this.notifier.notify('error', error.error.message);
                }  
              }
            );
        }
        this.editPurchaseItem = undefined;
        
    }  
    
    delete(purchaseItem: PurchaseItem): void{
        
        this.purchaseItemService.delete(purchaseItem.id, this.purchase.id).subscribe(response => {
            this.purchaseItems = this.purchaseItems.filter(h => h !== purchaseItem);
            
            this.notifier.notify('success', response.message);  
        },
        (error: HttpErrorResponse) =>{
                  if (error.error instanceof Error) {
                  //A client-side or network error occurred.				 
                  console.log('An error occurred:', error.error.message);
                } else {
                  //Backend returns unsuccessful response codes such as 404, 500 etc.				 
                  console.log('Backend returned status code: ', error.status);
                  console.log('Response body:', error.error);
                  this.notifier.notify('error', error.error.message);
                }  
              }
        );
    }
}