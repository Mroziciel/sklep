import { Component } from '@angular/core';
import {Product} from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true
})
export class AppComponent {
  view: 'products' | 'cart' | 'orders' = "products";
  cartPopoverVisible = false;
  cart: Product[] = [];
  addToCart(product: Product){
    this.cart.push(product);
  }

  removeFromCart(product: Product){
    const index = this.cart.indexOf(product);
    if(index > -1) this.cart.splice(index, 1);
  }

  clearCart(){
    this.cart = [];
}
  toggleCartPopover(){
    this.cartPopoverVisible = !this.cartPopoverVisible;
  }
}
