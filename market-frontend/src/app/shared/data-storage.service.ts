import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Address } from '../models/address.model';
import { Product } from '../models/product.model';
import { AddressService } from '../services/address.service';
import { ProductService } from '../services/product.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(private http: HttpClient, 
              private addressService: AddressService,
              private productService: ProductService) {}

  fetchAddresses() {
    return this.addressService.getListAddressRequest()
      .pipe(
        tap(addresses => {
          this.addressService.setAddresses(addresses);
        })
      )
  }

  fetchProducts(){
    return this.productService.getListProductRequest()
      .pipe(
        tap(products => {
          this.productService.setProducts(products);
        })
      )
  }
}
