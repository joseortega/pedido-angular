import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {PurchaseService} from '../../services/purchase.service';
import { HttpErrorResponse } from '@angular/common/http';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PurchaseDetailComponent} from '../purchase-detail/purchase-detail.component';
import {PurchaseEditComponent} from '../purchase-edit/purchase-edit.component';
import {PurchaseSendComponent} from '../purchase-send/purchase-send.component';
import {Purchase} from '../../model/purchase';
import {PurchaseNewComponent} from '../purchase-new/purchase-new.component';
import {PurchaseItemComponent} from '../purchase-item/purchase-item.component';
import {Office} from '../../model/office';
import {OfficeService} from '../../services/office.service';

import {PurchaseStatus} from '../../model/purchase-status';

@Component({
  selector: 'app-purchase-list-request',
  templateUrl: './purchase-list-request.component.html',
  styleUrls: ['./purchase-list-request.component.css'],
  providers: [UserService, PurchaseService, OfficeService]
})
export class PurchaseListRequestComponent implements OnInit {
    
    public purchases;
    public selectedPurchase: Purchase;
    public page=1;
    public totalCount: number;
    public roles;
    public purchaseStatus = PurchaseStatus;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private userService: UserService, 
    private purchaseService: PurchaseService, 
    private modalService: NgbModal) 
    { 
    }

  ngOnInit() {
      this.getPurchases();
      this.redirectDefault();
      this.roles= this.userService.getRoles();
  }
  
  redirectDefault(){
        if (!this.userService.getCurrentUser()){
            this.router.navigate(['/login']);
        }
   }
   
   loadPage(page: number) {
       this.getPurchases();
  }
    
    getPurchases(){ 
        this.purchaseService.getPurchaseListRequest(this.page).subscribe(
          data => {
              this.purchases = data.items;
              this.totalCount = data.total_count;             
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
    
    onSelect(purchase: Purchase): void {
        this.selectedPurchase = purchase;
        
        if (this.selectedPurchase.status == PurchaseStatus.EDITION_STATUS){
            const modalRef = this.modalService.open(PurchaseEditComponent,  { size: 'lg' }); 
            modalRef.componentInstance.purchase = this.selectedPurchase;
            modalRef.componentInstance.purchases = this.purchases;
            
        } else if (this.selectedPurchase.status == PurchaseStatus.REQUEST_STATUS && (this.roles.some(elem => elem == 'ROLE_ADMIN') || this.roles.some(elem => elem == 'ROLE_RESPONSE'))){
           const modalRef = this.modalService.open(PurchaseSendComponent,  { size: 'lg' }); 
            modalRef.componentInstance.purchase = this.selectedPurchase;
            modalRef.componentInstance.purchases = this.purchases;
        }else{
            const modalRef = this.modalService.open(PurchaseDetailComponent,  { size: 'lg' });
            modalRef.componentInstance.purchase = this.selectedPurchase;
        }
    }
    
    onNew():void{
        const modalRef = this.modalService.open(PurchaseNewComponent, { size: 'lg' });
        modalRef.componentInstance.purchases = this.purchases;
        modalRef.componentInstance.totalCount = this.totalCount;
    }  
}
