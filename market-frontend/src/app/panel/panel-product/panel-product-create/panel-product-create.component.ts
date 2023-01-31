import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/models/category.model';
import { Unit } from 'src/app/models/unit.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-panel-product-create',
  templateUrl: './panel-product-create.component.html',
  styleUrls: ['./panel-product-create.component.css']
})
export class PanelProductCreateComponent implements OnInit {

  units: Unit[];
  categories: Category[];
  
  categoryList: any = [];
  unitObject: any;
  imageObject: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.onGetListUnit();
    this.onGetListCategory();
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

  onSelectUnit(unit: any){
    this.unitObject = unit.name;
    return this.unitObject
  }

  onSelectCategory(categoryName: string){
    this.categoryList.push(categoryName);
    return this.categoryList
  }


  onCreateProduct(postData: {
    id: number,  
    name: string, 
    price: number, 
    short_desc: string, 
    long_desc: string
  }){
    const payload = {
      ...postData,
      category: this.categoryList,
      unit: this.unitObject,
      image: this.imageObject
    }
    this.productService.postCreateProductRequest(payload)
        .subscribe(data => {
          console.log(data);
          this.productService.addProduct(data);
    });
  }
}
