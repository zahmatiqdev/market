import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Address } from '../models/address.model';
import { AddressService } from '../services/address.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(private http: HttpClient, private addressService: AddressService) {}

  storeAddresses() {
    const addresses = this.addressService.getAddresses();
    this.http
      .put(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
        addresses
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchAddresses() {
    return this.addressService.getListAddressRequest()
      .pipe(
        tap(addresses => {
          this.addressService.setAddresses(addresses);
        })
      )
    // return this.http
    //   .get<Address[]>(
    //     'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json'
    //   )
    //   .pipe(
    //     tap(addresses => {
    //       this.addressService.setRecipes(addresses);
    //     })
    //   )
  }
}
