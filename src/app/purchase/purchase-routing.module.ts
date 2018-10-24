import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PurchaseComponent} from './purchase.component';
import {PurchaseListComponent} from './purchase-list/purchase-list.component';
import {PurchaseListRequestComponent} from './purchase-list-request/purchase-list-request.component';
import {PurchaseDetailComponent} from './purchase-detail/purchase-detail.component';
import {PurchaseNewComponent} from './purchase-new/purchase-new.component';
import {ProductListComponent} from './product-list/product-list.component';

import {AuthGuard} from '../guards/';

const appRoutes: Routes = [
    {
        path: '',
        component: PurchaseComponent,
        children: [
            {path: 'purchase', component: PurchaseListComponent, canActivate: [AuthGuard]},
            {path: 'purchase-request', component: PurchaseListRequestComponent, canActivate: [AuthGuard]},
            {path: 'product', component: ProductListComponent, canActivate: [AuthGuard]},
            {path: '', redirectTo: '/purchase', pathMatch: 'full' },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes) ],
  exports: [ RouterModule ]
})

export class PurchaseRoutingModule{}

