import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Signup } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  baseURL: string = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) { }

  signupRequest(signup: Signup): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    const body=JSON.stringify(signup);
    return this.http.post(this.baseURL + 'api/user/create/', body, {'headers':headers})
  }
}
