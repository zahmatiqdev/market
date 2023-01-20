import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Signin } from '../models/signin.model';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  baseURL: string = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) { }

  signinRequest(signin:Signin): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    const body=JSON.stringify(signin);
    return this.http.post(this.baseURL + 'api/user/signin/', body, {'headers':headers})
  }
}
