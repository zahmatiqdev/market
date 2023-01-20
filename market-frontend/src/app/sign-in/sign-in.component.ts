import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  @Output() cancelSignIn = new EventEmitter();

  baseURL: string = "http://127.0.0.1:8000/";
  token: string = '';
  outputObject: any;

  constructor(private signin: SigninService){}

  ngOnInit(){}

  onSignIn(postData: {email: string, password: string}){
    this.signin.signinRequest(postData)
      .subscribe(data => {
        if (data){
          console.log(data);
          const token = data.token.replace(/^["'](.+(?=["']$))["']$/, '$1');;
          localStorage.setItem('Authorization', 'Token ' + token);
        } else {
          console.log('There is no token.');
        }
      });
  }

  onCancel(){
    this.cancelSignIn.emit(false);
    console.log('cancelled');
  }
}
