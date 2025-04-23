import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styles: [`
    .offcanvas-cart {
      position: fixed;
      top: 0;
      right: -320px;
      width: 320px;
      height: 100vh;
      background: white;
      box-shadow: -2px 0 5px rgba(0,0,0,0.1);
      transition: right 0.3s ease-in-out;
      z-index: 1050;
      padding: 1rem;
    }

    .offcanvas-cart.show {
      right: 0;
    }

    .cart-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.5);
      z-index: 1040;
      display: none;
    }

    .cart-backdrop.show {
      display: block;
    }
  `]
})
export class CartComponent {
  private cartService = inject(CartService);
  items$: Observable<Product[]> = this.cartService.getCartObservable();
  isOpen = false;

  toggleCart() {
    this.isOpen = !this.isOpen;
  }

  closeCart() {
    this.isOpen = false;
  }

  removeItem(item: Product) {
    this.cartService.removeFromCart(item);
  }

  async finalizeOrder() {
    const success = await this.cartService.finalizeOrder();
    if (success) {
      this.closeCart();
      alert('Zamówienie zostało złożone pomyślnie!');
    } else {
      alert('Wystąpił błąd podczas składania zamówienia.');
    }
  }
}
