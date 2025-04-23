import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product} from '../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  @Input() items: Product[] = [];
  @Output() remove = new EventEmitter<Product>();
  @Output() checkout = new EventEmitter<void>();

  async finalizeOrder(){
    if(this.items.length === 0) return;
    await fetch('http://localhost:3000/orders', {method: 'POST', headers: { 'Content-Type': "application/json"},
    body: JSON.stringify({products: this.items})
    });

    this.checkout.emit();
  }

  removeItem(product: Product) {
    this.remove.emit(product);
  }
}
