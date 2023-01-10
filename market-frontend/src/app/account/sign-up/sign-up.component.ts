import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @Output() cancelSignUp = new EventEmitter();

  baseURL: string = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient){}

  ngOnInit(){}

  onSignUp(postData: {name: string, email: string, password: string}){
    const createUserUrl = this.baseURL + 'api/user/create/';
    this.http.post(createUserUrl, postData)
    .subscribe(responseData => {
      console.log(responseData);
    });
  }

  onCancel(){
    this.cancelSignUp.emit(false);
    console.log('cancelled');
  }

}
