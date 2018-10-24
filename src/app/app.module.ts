import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { httpInterceptorProviders } from './http-interceptor';
import { PurchaseModule } from './purchase/purchase.module';

import { notifierModule } from './notifier';



@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    PurchaseModule,
    AppRoutingModule,
    LoadingBarHttpClientModule,
    notifierModule
  ],
  providers: [
    UserService,
    HttpErrorHandler,
    MessageService,
    httpInterceptorProviders  
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
 // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
