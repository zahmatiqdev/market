import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Unit } from 'src/app/models/unit.model';
import { Category } from 'src/app/models/category.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-panel-product-edit',
  templateUrl: './panel-product-edit.component.html',
  styleUrls: ['./panel-product-edit.component.css']
})
export class PanelProductEditComponent implements OnInit {

  id: number;
  editMode = true;
  productForm: FormGroup;
  units: Unit[];
  categories: Category[];

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.onGetListCategory();
    this.onGetListUnit();
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.productService.updateProduct(this.id, this.productForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let productCategory = [];
    let productUnit = '';
    let productName = '';
    let productPrice = 0;
    let productShortDesc = '';
    let productLongDesc = '';

    if (this.editMode) {
      const product = this.productService.getProduct(+this.id);
      productCategory = product.category;
      productUnit = product.unit;
      productName = product.name;
      productPrice = product.price;
      productShortDesc = product.short_desc;
      productLongDesc = product.long_desc;
    }

    this.productForm = new FormGroup({
      category: new FormControl(productCategory, Validators.required),
      unit: new FormControl(productUnit, Validators.required),
      name: new FormControl(productName, Validators.required),
      price: new FormControl(productPrice, Validators.required),
      short_desc: new FormControl(productShortDesc, Validators.required),
      long_desc: new FormControl(productLongDesc, Validators.required)
    });
  }

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
}