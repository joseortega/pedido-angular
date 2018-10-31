import {Component, OnInit, Input} from '@angular/core';
import {Purchase} from '../../model/purchase';
import {Office} from '../../model/office';
import {PurchaseService} from '../../services/purchase.service';
import {UserService} from '../../services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OfficeService} from '../../services/office.service';

import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-purchase-new',
  templateUrl: './purchase-new.component.html',
  styleUrls: ['./purchase-new.component.css'],
  providers: [PurchaseService, UserService, OfficeService]
  
})
export class PurchaseNewComponent implements OnInit {
    
  public offices: Array<Office>;
  public purchase: Purchase;
  public submitted: boolean;
  private readonly notifier: NotifierService;
  
  @Input() private purchases: any;
  @Input() private totalCount: number;
 
  onSubmit() { 
    this.newPurchase(); 
  }

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private purchaseService: PurchaseService, 
    private userService: UserService,
    public activeModal: NgbActiveModal,
    private officeService: OfficeService,
    private notifierService: NotifierService) {
      
      this.purchase = new Purchase();   
      this.purchase.office = new Office();
      this.notifier = notifierService;
      this.submitted = false;
    }

  ngOnInit() {
      this.getOffices();
  }
  
  newPurchase(){
      this.purchaseService.addPurchase(this.purchase).subscribe(
          data => {
              this.purchase = data.data;
              this.purchases.splice(0,0,this.purchase);
              this.totalCount = this.totalCount+1;
              this.submitted = true; 
              
              this.notifier.notify( 'success', 'Creado con exito');     
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
  
  getOffices(){
      this.officeService.getOffices().subscribe(
          response => {
              this.offices =  response.data;        
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

}
