import { CartService } from 'src/app/services/cart.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderInterceptor } from './shared/header.interceptor';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailComponent } from './shop/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressComponent } from './account/address/address.component';
import { AddressDetailComponent } from './account/address/address-detail/address-detail.component';
import { AddressEditComponent } from './account/address/address-edit/address-edit.component';
import { AddressListComponent } from './account/address/address-list/address-list.component';
import { OrderListComponent } from './account/order-list/order-list.component';
import { OrderDetailComponent } from './account/order-list/order-detail/order-detail.component';
import { PersonalInfoComponent } from './account/personal-info/personal-info.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    ShopComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    AddressComponent,
    AddressDetailComponent,
    AddressEditComponent,
    AddressListComponent,
    OrderListComponent,
    OrderDetailComponent,
    PersonalInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { 
        path: 'account', component: AccountComponent,
        children: [
          {
            path: 'address', component: AddressComponent,
            children: [
              { path: '', component: AddressListComponent },
              { path: 'new', component: AddressEditComponent },
              { path: ':id', component: AddressDetailComponent },
              { path: ':id/edit', component: AddressEditComponent }
            ]
          },
          {
            path: 'order-list', component: OrderListComponent,
            children: [
              { path: ':id', component: OrderDetailComponent }
            ]
          },
          { path: 'personal-info', component: PersonalInfoComponent }
        ]
      },
      { path: 'signup', component: SignUpComponent },
      { path: 'signin', component: SignInComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent }
    ])
  ],
  providers: [ 
    CartService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
