import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from './models/product';
import { CartService } from './services/cart.service';
import { CartComponent } from './components/cart/cart.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, CartComponent]
})
export class AppComponent {
  cart: Product[] = [];

  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((items: Product[]) => {
      this.cart = items;
    });
  }
}
