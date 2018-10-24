import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import {UserService} from '../../services/user.service';
import {ProductService} from '../../services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [UserService, ProductService]
})
export class ProductListComponent implements OnInit {
    
    private products: {};
    private page = 1;
    private totalCount: number;

    constructor(
        private route: ActivatedRoute, 
        private router: Router,
        private productService: ProductService, 
        private userService: UserService) { 
        
        }

    ngOnInit() {
        this.getProducts();
    }
    
    loadPage(page: number) {
      this.getProducts();
  }
    
    getProducts(){
        this.productService.getProductList(this.page).subscribe(
          data => {
              this.products = data.items;
              this.totalCount = data.total_count;               
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
