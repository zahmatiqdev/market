import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-panel-product-list',
  templateUrl: './panel-product-list.component.html',
  styleUrls: ['./panel-product-list.component.css']
})
export class PanelProductListComponent implements OnInit {

  products: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit() {
    this.subscription = this.productService.productsChanged
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        }
      );
    this.products = this.productService.getProducts();
  }

  onCreateProduct() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}