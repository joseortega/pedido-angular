import {Component, OnInit } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent {
  public currentUser = this.userService.getCurrentUser();
  public decodeToken = this.userService.getDecodeToken();
  
  constructor(private userService: UserService){ 
  }
  
  ngOninit(){
      console.log(this.currentUser);
      console.log(this.decodeToken);
  }
}
