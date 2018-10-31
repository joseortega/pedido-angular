import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params, ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers: [UserService]
})
export class UserLoginComponent implements OnInit {
    public user: User;
    private readonly notifier: NotifierService;

    constructor(private notifierService: NotifierService, private route: ActivatedRoute, private router: Router, private userService: UserService){
          this.user = {'username':'', 'password':''};
          this.notifier = notifierService;
    }
    
    ngOnInit() {   
        this.logout();
        this.redirectDefault();
    }

    redirectDefault(){
        if (this.userService.getCurrentUser()){
            this.router.navigate(['/']);
        }
    }

    logout(){
        this.route.params.forEach((params: Params)=>{
            let logout = +params['id'];
            if (logout == 1){
                this.userService.logout();
                this.router.navigate(['/login']);
            }
        })
    }
  
    onSubmit(){ 
        this.userService.signup(this.user).subscribe(
          response => {
              localStorage.setItem('currentUser', JSON.stringify({username: this.user.username, token: 'Bearer '+response.token}));
              this.router.navigate(['/purchase']);         
          },
          (error: HttpErrorResponse) =>{
              this.notifier.notify( 'error', error.error.message);
          }
        );
    }
}
