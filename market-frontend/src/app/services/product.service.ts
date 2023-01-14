import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL: string = "http://127.0.0.1:8000/";

  
  constructor(private http: HttpClient) { }

  listProductsRequest(): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    return this.http.get(this.baseURL + 'api/market/product/', {'headers':headers})
  }

  getProductDetailRequest(id: string): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    return this.http.get(this.baseURL + 'api/market/product/' + id + '/', {'headers':headers})
  }

}
