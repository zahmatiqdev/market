import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseURL: string = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) { }

  profileRequest(): Observable<any>{
    const headers = { 'content-type': 'application/json'};
    return this.http.get(this.baseURL + 'api/user/profile/', {'headers':headers})
  }

  getListAddressRequest(): Observable<any>{
    const headers = { 'content-type': 'application/json'};
    return this.http.get(this.baseURL + 'api/market/address/', {'headers':headers})
  }

  postCreateAddressRequest(address: Address): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    const body=JSON.stringify(address);
    return this.http.post(this.baseURL + 'api/market/address/', body, {'headers':headers})
  }
}
