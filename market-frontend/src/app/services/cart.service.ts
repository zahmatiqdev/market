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
  
  constructor() { }

  addToCart(product: Product, quantity: number = 1) {
    this.orderItem = {
      'id': product.id,
      'name': product.name, 
      'price': Number(product.price), 
      'image': product.image,
      'quantity': quantity
    }
    this.items.push(this.orderItem);
    // return console.log(this.items);
  }

  getItems() {
    console.log(this.items);
    return this.items;
  }

  multiplicationTwoNumber(num1: number, num2: number) {
    return this.totalNumber = num1 * num2;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
