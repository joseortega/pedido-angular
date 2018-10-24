import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Purchase} from '../../model/purchase';
import {PurchaseItem} from '../../model/purchaseItem';
import {PurchaseItemService} from '../../services/purchase-item.service';
import {UserService} from '../../services/user.service';
import {PrintService} from '../../services/print.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {PurchaseStatus} from '../../model/purchase-status';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css'],
  providers: [PurchaseItemService, UserService, PrintService]
})

export class PurchaseDetailComponent  {

  @Input() private purchase: Purchase;
  private purchaseItems: any;
  private purchaseStatus = PurchaseStatus;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private activeModal: NgbActiveModal, 
    private purchaseItemService: PurchaseItemService, 
    private userService: UserService,
    private printService: PrintService) {}
  
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
    
    printPurchase(){
        this.printService.printPurchase(this.purchase, this.purchaseItems);
    }
}
