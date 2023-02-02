import { Product } from 'src/app/models/product.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from 'src/app/models/category.model';
import { Unit } from 'src/app/models/unit.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-panel-product-create',
  templateUrl: './panel-product-create.component.html',
  styleUrls: ['./panel-product-create.component.css']
})
export class PanelProductCreateComponent implements OnInit {

  @ViewChild('f', { static: false }) slForm: NgForm;
  units: Unit[];
  categories: Category[];
  
  imageObject: File;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.onGetListUnit();
    this.onGetListCategory();
    this.onImageChange(event);
  }

  onCancel() {}

  onGetListUnit(){
    this.productService.getListUnitRequest()
        .subscribe(data => {
          console.log(data);
          this.units = data;
    })
  }

  onGetListCategory(){
    this.productService.getListCategoryRequest()
        .subscribe(data => {
          console.log(data);
          this.categories = data;
    })
  }

  onImageChange(event: any){
    this.imageObject = event.target.files[0];
  }

  onCreateProduct(form: NgForm){
    const value = form.value;

    const payloadData = new FormData();
    for (let i = 0; i < value.category.length; i++) {
      payloadData.append('category', value.category[i])
    }
    
    payloadData.append('unit', value.unit)
    payloadData.append('name', value.name)
    payloadData.append('price', value.price)
    payloadData.append('short_desc', value.short_desc)
    payloadData.append('long_desc', value.long_desc)
    payloadData.append('image', this.imageObject, this.imageObject.name)

    this.productService.postCreateProductRequest(payloadData)
      .subscribe(data => {
        console.log(data);
        this.productService.addProduct(data);
      });
    form.reset();
  }
}
