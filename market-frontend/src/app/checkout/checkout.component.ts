import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProfileService } from '../services/profile.service';
import { OrderService } from '../services/order.service';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  items = this.cartService.getItems();
  orderItemList: any = [];
  checkAuthenticated = false;
  userProfile: any;
  userAddress: any;
  userAddressNameSelected: string = 'No address has been selected';
  userAddressIdSelected: any;
  orderNote: string = '';
  addressId: number = 0;
  deliveryDate: any;

  constructor(private cartService: CartService,
              private profileService: ProfileService,
              private orderService: OrderService,
              private addressService: AddressService) {}

  ngOnInit() {
    this.onCheckAuthenticate();
    if (localStorage.getItem('Authorization')){
      this.onProfile()
      this.onGetUserAddress()
    }
  }

  onTotalEachItemPrice(price: number=0, quantity: number=0) {
    return this.cartService.onMultiplicationTwoNumberService(price, quantity)
  }

  onSubtotalPrice(){
    return this.cartService.onSubtotalPriceService()
  }

  onTaxPrice(){
    return this.cartService.onTaxPriceService(0.5)
  }

  onTotalPrice(){
    return this.cartService.onTotalPriceService()
  }

  onCheckAuthenticate(){
    if (localStorage.getItem('Authorization')){
      this.checkAuthenticated = true;
    } 
  }

  onProfile() {
    this.profileService.profileRequest()
        .subscribe(data => {
          console.log(data);
          this.userProfile = data;
    })
  }

  onGetUserAddress(){
    this.addressService.getListAddressRequest()
        .subscribe(data => {
          console.log(data);
          this.userAddress = data;
    })
  }

  onCreateUserAddress(postData: any){
    this.addressService.postCreateAddressRequest(postData)
        .subscribe(data => {
          console.log(data);
          this.userAddress = data;
    })
  }
  onSubmitAddress(addressName: string){
    let bodyObject: any;
    bodyObject = {
      name: addressName
    }
    return this.onCreateUserAddress(bodyObject)
  }

  onSelectAddress(address: any){
    let addressId = address.id;
    let addressName = address.name;
    this.userAddressNameSelected = addressName;
    this.userAddressIdSelected = addressId
    return addressId
  }

  // onSubmitNote(orderNote: string) {
  //   this.orderNote = orderNote;
  //   return orderNote
  // }

  // onSubmitDelivery(deliveryDate: string) {
  //   this.deliveryDate = deliveryDate
  //   return deliveryDate
  // }

  onSubmitInfo(deliveryDate: string, orderNote: string){
    this.deliveryDate = deliveryDate
    this.orderNote = orderNote;
  }

  onCreateProductsItem(){
    for (var item of this.items) {
      this.orderItemList.push(
        {
          product: item.id,
          quantity: item.quantity
        }
      );
    }
    return this.orderItemList;
  }

  onSubmitCheckout(){
    let orderObject: any;
    orderObject = {
      delivery: this.deliveryDate,
      note: this.orderNote,
      address: this.userAddressIdSelected,
      products: this.onCreateProductsItem(),
      price: this.onTotalPrice()
    }
    console.log("ORDER Object NOTE: " + orderObject.note)
    console.log("ORDER Object Address: " + orderObject.address)

    this.orderService.postCreateOrderRequest(orderObject)
        .subscribe(data => {
          console.log("ORDER: " + data);

    })
  }
}
