import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let Authorization: any;
      if (localStorage.getItem('Authorization')){
        Authorization = localStorage.getItem('Authorization');
        return next.handle(httpRequest.clone({ setHeaders: { Authorization } }));
      } else {
        return next.handle(httpRequest);
      }
  }
}