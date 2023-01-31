import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id: any;
  product: any;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      });
      this.product = this.onGetProductDetail();
  }

  onGetProductDetail() {
    this.productService.getRetrieveProductRequest(this.id)
        .subscribe(data => {
          console.log(data);
          this.product = data;
    })
  }

  addToCart(product: Product, quantityItem: HTMLInputElement) {
    this.cartService.addToCart(product, Number(quantityItem.value));
    window.alert('Your product has been added to the cart!');
  }

}
