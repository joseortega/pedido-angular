import {Component, OnInit, Input} from '@angular/core';
import {Purchase} from '../../model/purchase';
import {PurchaseService} from '../../services/purchase.service';
import {UserService} from '../../services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PurchaseDetailComponent} from '../purchase-detail/purchase-detail.component';
import {Office} from '../../model/office';
import {OfficeService} from '../../services/office.service';

import {NotifierService} from 'angular-notifier';
import {PurchaseStatus} from '../../model/purchase-status';

@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrls: ['./purchase-edit.component.css'],
  providers: [PurchaseService, UserService, OfficeService]
})
export class PurchaseEditComponent implements OnInit {

  @Input() private purchases: any;
  @Input() private purchase: Purchase;
  private offices: Array<Office>;
  private purchaseStatus = PurchaseStatus;

  private roles: any;
  private readonly notifier: NotifierService;
   
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private purchaseService: PurchaseService, 
    private userService: UserService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private officeService: OfficeService,
    private notifierService: NotifierService) {
    
      this.notifier = notifierService; 
    }

  ngOnInit() {
      this.getOffices();
      this.roles = this.userService.getRoles();
  }
  
  closeModal() {
        this.activeModal.close('Modal Closed');
    }
 
  updatePurchase(){
      this.purchaseService.updatePurchase(this.purchase).subscribe(
          response => {
              this.purchase = response.data;
              const ix = this.purchase ? this.purchases.findIndex(h => h.id === this.purchase.id) : -1;
              if (ix > -1) {this.purchases[ix] = this.purchase; }
              
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
  
  requestPurchase(){
      this.purchaseService.requestPurchase(this.purchase.id).subscribe(
          response => {
              this.purchase = response.data;
              const ix = this.purchase ? this.purchases.findIndex(h => h.id === this.purchase.id) : -1;
              if (ix > -1) {this.purchases[ix] = this.purchase; }
              
              this.notifier.notify('success', response.message);   
          },
          (error: HttpErrorResponse) =>{
              this.notifier.notify('error', error.error.message);
          }
        );
    }
    
    getOffices(){
      this.officeService.getOffices().subscribe(
          response => {
              this.offices = response.data;        
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
    
      deletePurchase(){
      const ix = this.purchase ? this.purchases.findIndex(h => h.id === this.purchase.id) : -1;
      this.purchaseService.deletePurchase(this.purchase.id).subscribe(
          response => {
              this.purchase = response.data
              if (ix > -1) {this.purchases.splice(ix, 1);
}
              this.closeModal();
              
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
