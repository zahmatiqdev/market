import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseURL: string = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) { }

  postCreateOrderRequest(order:Order): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    const body=JSON.stringify(order);
    return this.http.post(this.baseURL + 'api/market/order/create/', body, {'headers':headers})
  }

  getListOrderRequest(): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    return this.http.get(this.baseURL + 'api/market/order/', {'headers':headers})
  }

  getRetrieveOrderRequest(id: number): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    return this.http.get(this.baseURL + 'api/market/order/' + id + '/', {'headers':headers})
  }
}
