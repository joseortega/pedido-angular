import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {UserLoginComponent} from './user-login/user-login.component'


import {AuthGuard} from './guards/';

const loginRoutes: Routes = [
    {path: 'login', component: UserLoginComponent},
    {path: 'login/:id', component: UserLoginComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(loginRoutes) ],
    exports: [ RouterModule ]
})

export class LoginRoutingModule{}



