import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { PersonalInfoComponent } from './account/personal-info/personal-info.component';
import { OrderComponent } from './account/order/order.component';
import { OrderDetailComponent } from './account/order/order-detail/order-detail.component';
import { AccountDashboardComponent } from './account/account-dashboard/account-dashboard.component';
import { AddressCreateComponent } from './account/address/address-create/address-create.component';
import { AddressResolverService } from './services/address-resolver.service';
import { ProductResolverService } from './services/product-resolver.service';
import { PanelComponent } from './panel/panel.component';
import { PanelDashboardComponent } from './panel/panel-dashboard/panel-dashboard.component';
import { PanelProductComponent } from './panel/panel-product/panel-product.component';
import { PanelProductCreateComponent } from './panel/panel-product/panel-product-create/panel-product-create.component';
import { PanelProductDetailComponent } from './panel/panel-product/panel-product-detail/panel-product-detail.component';
import { PanelProductEditComponent } from './panel/panel-product/panel-product-edit/panel-product-edit.component';


const appRoutes: Routes = [
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
];


@NgModule({
  imports: [
      RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
