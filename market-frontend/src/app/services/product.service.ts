import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsChanged = new Subject<Product[]>();
  private products: Product[] = [];
  productDetail: any;

  baseURL: string = "http://127.0.0.1:8000/";
  
  constructor(private http: HttpClient) { }

  getListProductRequest(): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    return this.http.get(this.baseURL + 'api/market/product/', {'headers':headers})
  }

  getRetrieveProductRequest(id: number): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    return this.http.get(this.baseURL + 'api/market/product/' + id + '/', {'headers':headers})
  }

  postCreateProductRequest(product: Product): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    const body=JSON.stringify(product);
    return this.http.post(this.baseURL + 'api/market/product/create/', body, {'headers':headers})
  }

  patchUpdateProductRequest(id: number, product: Product): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    const body=JSON.stringify(product);
    return this.http.patch(this.baseURL + 'api/market/product/' + id + '/', body, {'headers':headers})
  }

  delDeleteProductRequest(id: number): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    return this.http.delete(this.baseURL + 'api/market/product/' + id + '/', {'headers':headers})
  }

  getListUnitRequest(): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    return this.http.get(this.baseURL + 'api/market/unit/', {'headers':headers})
  }

  getListCategoryRequest(): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    return this.http.get(this.baseURL + 'api/market/category/', {'headers':headers})
  }

  setProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }

  getProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === index){
        this.productDetail = {
          'id': this.products[i].id,
          'name': this.products[i].name,
          'category': this.products[i].category,
          'unit': this.products[i].unit,
          'price': this.products[i].price,
          'short_desc': this.products[i].short_desc,
          'long_desc': this.products[i].long_desc,
          'image': this.products[i].image
        };
      }
    }
    return this.productDetail
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  updateProduct(index: number, newProduct: Product) {
    this.patchUpdateProductRequest(index, newProduct)
        .subscribe(data => {
          console.log("Update: " + data);
    });
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === index){
        this.products[i].name = newProduct.name;
        this.products[i].category = newProduct.category;
        this.products[i].unit = newProduct.unit;
        this.products[i].price = newProduct.price;
        this.products[i].short_desc = newProduct.short_desc;
        this.products[i].long_desc = newProduct.long_desc
      }
    }
    
    this.productsChanged.next(this.products.slice());
  }

  deleteProduct(index: number) {
    this.delDeleteProductRequest(index)
      .subscribe(() => {})
    
    const item = this.products.findIndex(p => p.id === index);
    this.products.splice(item, 1);

    this.productsChanged.next(this.products.slice());
  }
}
