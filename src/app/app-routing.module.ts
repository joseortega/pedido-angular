import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UserLoginComponent} from './user-login/user-login.component'
import {AuthGuard} from './guards/';

const appRoutes: Routes = [

    {path: 'purchase', loadChildren: './purchase/purchase.module#PurchaseModule'},
    {path: 'login', component: UserLoginComponent},
    {path: 'login/:id', component: UserLoginComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/purchase', pathMatch: 'full' },
    {path: '**', component: UserLoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
//  imports: [ RouterModule.forRoot(appRoutes,  { enableTracing: true }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule{}


