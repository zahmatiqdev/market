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

  onRemoveItem(itemIndex:number){
    this.items.splice(itemIndex, 1)
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
}
