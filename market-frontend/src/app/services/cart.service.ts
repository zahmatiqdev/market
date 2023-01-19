import { Injectable } from '@angular/core';

import { Product } from "../models/product.model";
import { OrderItem } from "../models/orderitem.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: OrderItem[] = [];
  orderItem: any;
  totalNumber: number = 0;
  subtotalPrice: number = 0;
  taxPrice: number = 0;
  totalPrice: number = 0;

  constructor() { }

  addToCart(product: Product, quantity: number = 1) {
    this.orderItem = {
      'id': product.id,
      'product': product.name, 
      'price': Number(product.price), 
      'image': product.image,
      'quantity': quantity
    }
    this.items.push(this.orderItem);
  }

  getItems() {
    console.log(this.items);
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  onMultiplicationTwoNumberService(num1: number=0, num2: number=0) {
    return this.totalNumber = num1 * num2;
  }

  onSubtotalPriceService(){
    let subtotalPrice = 0;
    for (var item of this.items){
        subtotalPrice += this.onMultiplicationTwoNumberService(item.price, item.quantity); 
    }
    this.subtotalPrice = subtotalPrice;
    return subtotalPrice
  }
  
  onTaxPriceService(tax: number=0){
    return this.taxPrice = this.items.length * tax;
  }

  onTotalPriceService(){
    return this.totalPrice = this.subtotalPrice + this.taxPrice
  }
}
