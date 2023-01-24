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
    return this.http.get(this.baseURL + 'api/user/account/', {'headers':headers})
  }
}
