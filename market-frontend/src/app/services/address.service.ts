import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';

import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  addressesChanged = new Subject<Address[]>();
  private addresses: Address[] = [];
  addressDetail: any;

  baseURL: string = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) {}

  getListAddressRequest(): Observable<any>{
    const headers = { 'content-type': 'application/json'};
    return this.http.get(this.baseURL + 'api/market/address/', {'headers':headers})
  }

  getRetrieveAddressRequest(id: number): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    return this.http.get<{ [key: string]: Address }>(this.baseURL + 'api/market/address/' + id + '/', {'headers':headers})
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

  delDeleteAddressRequest(id: number): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    return this.http.delete(this.baseURL + 'api/market/address/' + id + '/', {'headers':headers})
  }


  setAddresses(addresses: Address[]) {
    this.addresses = addresses;
    this.addressesChanged.next(this.addresses.slice());
  }

  getAddresses() {
    return this.addresses.slice();
  }

  getAddress(index: number) {
    for (let i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i].id === index){
        this.addressDetail = {
          'id': this.addresses[i].id,
          'name': this.addresses[i].name
        };
      }
    }
    return this.addressDetail
  }

  addAddress(address: Address) {
    this.addresses.push(address);
    this.addressesChanged.next(this.addresses.slice());
  }

  updateAddress(index: number, newAddress: Address) {
    this.putUpdateAddressRequest(index, newAddress)
        .subscribe(data => {
          console.log("Update: " + data);
    });
    for (let i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i].id === index){
        this.addresses[i].name = newAddress.name;
      }
    }
    
    this.addressesChanged.next(this.addresses.slice());
  }

  deleteAddress(index: number) {
    this.delDeleteAddressRequest(index)
      .subscribe(() => {})
    
    const item = this.addresses.findIndex(p => p.id === index);
    this.addresses.splice(item, 1);

    this.addressesChanged.next(this.addresses.slice());
  }

}
