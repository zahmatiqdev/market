import { CartService } from 'src/app/services/cart.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { PersonalInfoComponent } from './account/personal-info/personal-info.component';
import { OrderComponent } from './account/order/order.component';
import { OrderListComponent } from './account/order/order-list/order-list.component';
import { OrderDetailComponent } from './account/order/order-detail/order-detail.component';
import { OrderItemComponent } from './account/order/order-list/order-item/order-item.component';
import { AccountDashboardComponent } from './account/account-dashboard/account-dashboard.component';
import { AddressItemComponent } from './account/address/address-list/address-item/address-item.component';
import { AddressCreateComponent } from './account/address/address-create/address-create.component';
import { AddressResolverService } from './services/address-resolver.service';
import { ProductResolverService } from './services/product-resolver.service';
import { PanelComponent } from './panel/panel.component';
import { PanelDashboardComponent } from './panel/panel-dashboard/panel-dashboard.component';
import { PanelProductComponent } from './panel/panel-product/panel-product.component';
import { PanelProductCreateComponent } from './panel/panel-product/panel-product-create/panel-product-create.component';
import { PanelProductDetailComponent } from './panel/panel-product/panel-product-detail/panel-product-detail.component';
import { PanelProductEditComponent } from './panel/panel-product/panel-product-edit/panel-product-edit.component';
import { PanelProductListComponent } from './panel/panel-product/panel-product-list/panel-product-list.component';
import { PanelProductItemComponent } from './panel/panel-product/panel-product-list/panel-product-item/panel-product-item.component';

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
    PersonalInfoComponent,
    OrderComponent,
    OrderListComponent,
    OrderDetailComponent,
    OrderItemComponent,
    AccountDashboardComponent,
    AddressItemComponent,
    AddressCreateComponent,
    PanelComponent,
    PanelDashboardComponent,
    PanelProductComponent,
    PanelProductCreateComponent,
    PanelProductDetailComponent,
    PanelProductEditComponent,
    PanelProductListComponent,
    PanelProductItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { 
        path:'panel', 
        component: PanelComponent,
        resolve: [ProductResolverService],
        children: [
          { path: '', component: PanelDashboardComponent },
          {
            path: 'product', component: PanelProductComponent,
            children: [
              { path: 'create', component: PanelProductCreateComponent },
              { 
                path: ':id', 
                component: PanelProductDetailComponent, 
                resolve: [ProductResolverService] 
              },
              { 
                path: ':id/edit', 
                component: PanelProductEditComponent, 
                resolve: [ProductResolverService] 
              }
            ]
          }
        ]
      },
      { 
        path: 'account', 
        component: AccountComponent, 
        resolve: [AddressResolverService],
        children: [
          { path: '', component: AccountDashboardComponent },
          {
            path: 'address', component: AddressComponent,
            children: [
              { path: 'create', component: AddressCreateComponent },
              { 
                path: ':id', 
                component: AddressDetailComponent, 
                resolve: [AddressResolverService] 
              },
              { 
                path: ':id/edit', 
                component: AddressEditComponent, 
                resolve: [AddressResolverService] 
              }
            ]
          },
          { path: 'personal-info', component: PersonalInfoComponent },
          {
            path: 'order', component: OrderComponent,
            children: [
              { path: ':id', component: OrderDetailComponent }
            ]
          },
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
