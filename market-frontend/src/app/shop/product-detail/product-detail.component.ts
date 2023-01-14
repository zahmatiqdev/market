import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id: any;
  product: any;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      });
      this.product = this.onGetProductDetail();
  }

  onGetProductDetail() {
    this.productService.getProductDetailRequest(this.id)
        .subscribe(data => {
          console.log(data);
          this.product = data;
    })
  }

}
