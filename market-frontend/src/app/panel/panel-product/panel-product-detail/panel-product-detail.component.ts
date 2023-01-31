import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-panel-product-detail',
  templateUrl: './panel-product-detail.component.html',
  styleUrls: ['./panel-product-detail.component.css']
})
export class PanelProductDetailComponent implements OnInit {
  
  product: Product;
  id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.onGetProductDetail(this.id)
        }
      );
  }

  onGetProductDetail(id: number) {
    return this.productService.getRetrieveProductRequest(id)
        .subscribe(data => {
          console.log(data);
          this.product = new Product(
            data.id, 
            data.category, 
            data.unit, 
            data.name, 
            data.price, 
            data.short_desc, 
            data.long_desc, 
            data.image
          )
    })
  }
  
  onEditProduct() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProduct(){
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/product']);
  }

}