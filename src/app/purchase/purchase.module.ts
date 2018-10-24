import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { PurchaseComponent } from './purchase.component';
import { HttpErrorHandler }     from '../http-error-handler.service';
import { MessageService }       from '../services/message.service';
import { UserService } from '../services/user.service';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseListRequestComponent } from './purchase-list-request/purchase-list-request.component';
import { PurchaseDetailComponent } from './purchase-detail/purchase-detail.component';
import { PurchaseNewComponent } from './purchase-new/purchase-new.component';
import { PurchaseEditComponent } from './purchase-edit/purchase-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PurchaseItemComponent } from './purchase-item/purchase-item.component';
import { PurchaseSendComponent } from './purchase-send/purchase-send.component';
import { httpInterceptorProviders } from '../http-interceptor';

@NgModule({
  declarations: [
    PurchaseComponent,
    PurchaseListComponent,
    PurchaseListRequestComponent,
    PurchaseDetailComponent,
    PurchaseNewComponent,
    PurchaseEditComponent,
    ProductListComponent,
    PurchaseItemComponent,
    PurchaseSendComponent,
  ],
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    PurchaseRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    HttpErrorHandler,
    MessageService,
    httpInterceptorProviders
    
  ],
  bootstrap: [PurchaseComponent],
  entryComponents: [
      PurchaseDetailComponent,
      PurchaseNewComponent,
      PurchaseEditComponent,
      PurchaseItemComponent,
      PurchaseSendComponent
]
})

export class PurchaseModule { }
