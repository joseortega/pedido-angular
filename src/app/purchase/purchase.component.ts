import {Component, OnInit } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  providers:[UserService]
})
export class PurchaseComponent {
  public currentUser;
  public roles;
  
  constructor(private userService: UserService){ 
      
    this.currentUser = this.userService.getCurrentUser();
    this.roles = this.userService.getRoles();
  }
  
  ngOninit(){
      console.log(this.currentUser);
      console.log(this.roles);
  }
}
