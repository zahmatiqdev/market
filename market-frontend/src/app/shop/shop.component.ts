import { Component, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  product = new Product();
  products: any;

  constructor(private productService: ProductService,
              private cartService: CartService){}
  ngOnInit(): void {
    this.products = this.onListProducts();
  }

  onListProducts() {
    this.productService.listProductsRequest()
        .subscribe(data => {
          console.log(data);
          this.products = data;
    })
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}
