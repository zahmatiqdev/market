import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../services/profile.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  data = {};
  profile: any;
  info: any;
  items = this.cartService.getItems();

  constructor(private httpClient: HttpClient,
              private profileService: ProfileService,
              private cartService: CartService) { }
  
  ngOnInit(): void {
    this.httpClient.get('/assets/header.json').subscribe(data => this.data = data);
    if (localStorage.getItem('Authorization')){
      this.profile = this.onProfile();
    }
  }

  onProfile() {
    this.profileService.profileRequest()
        .subscribe(data => {
          console.log(data);
          this.profile = data;
    })
  }

  onLogoutUser(){
    return localStorage.removeItem('Authorization')
  }

  onQuantityItemChecklist(){
    return this.items.length;
  }
}
