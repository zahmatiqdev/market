import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';

import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  addressesChanged = new Subject<Address[]>();
  addresses: Address[] = [];

  baseURL: string = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) { }

  getListAddressRequest(): Observable<any>{
    const headers = { 'content-type': 'application/json'};
    return this.http.get(this.baseURL + 'api/market/address/', {'headers':headers})
  }

  onListAddress() {
    this.getListAddressRequest()
        .subscribe(data => {
          console.log(data);
          this.addresses = data
    });
  }

  postCreateAddressRequest(address: Address): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    const body=JSON.stringify(address);
    return this.http.post(this.baseURL + 'api/market/address/', body, {'headers':headers})
  }

  putUpdateAddressRequest(id: number, address: Address): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    const body=JSON.stringify(address);
    return this.http.put(this.baseURL + 'api/market/address/' + id + '/', body, {'headers':headers})
  }

  getRetrieveAddressRequest(id: number): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    return this.http.get(this.baseURL + 'api/market/address/' + id + '/', {'headers':headers})
  }

  // updateAddressesListWithObject(address: {id: number, name: string}){
  //   this.addresses.push(address);
  // }

  addToAddressListWithList(address: Array<{id: number, name: string}>){
    this.addresses = address;
  }

  getAddresses() {
    // return this.addresses.slice();
    
    return this.addresses;
  }

  getAddress(index: number) {
    return this.addresses[index];
  }

  addAddress(address: Address) {
    this.addresses.push(address);
    this.addressesChanged.next(this.addresses.slice());
  }

  updateAddress(index: number, newAddress: Address) {
    this.putUpdateAddressRequest(index, newAddress)
        .subscribe(data => {
          console.log("PUTTTTT: " + data);
    });
    this.addresses[index] = newAddress;
    this.addressesChanged.next(this.addresses.slice());
  }

}
