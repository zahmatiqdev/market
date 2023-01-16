import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  
  items = this.cartService.getItems();
  
  constructor(private cartService: CartService) {}

  onTotalPrice(price: number = 0, quantity: number = 0) {
    return this.cartService.multiplicationTwoNumber(price, quantity)
  }

}
