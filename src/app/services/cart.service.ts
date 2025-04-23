import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';
import { OrdersService } from './orders.service';
import { inject } from '@angular/core';
import { OrderProduct } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);
  private ordersService = inject(OrdersService);

  getItems(): Product[] {
    return this.cartItems.getValue();
  }

  addToCart(product: Product) {
    const currentItems = this.cartItems.getValue();
    this.cartItems.next([...currentItems, product]);
  }

  removeFromCart(product: Product) {
    const currentItems = this.cartItems.getValue();
    const newItems = currentItems.filter(item => item !== product);
    this.cartItems.next(newItems);
  }

  clearCart() {
    this.cartItems.next([]);
  }

  getCartObservable() {
    return this.cartItems.asObservable();
  }

  async finalizeOrder() {
    const items = this.getItems();
    if (items.length === 0) return false;

    const total = items.reduce((sum, item) => sum + item.price, 0);

    const orderData = {
      products: items.map(item => ({
        id: item.id.toString(),
        name: item.name,
        price: item.price
      } as OrderProduct)),
      total: total,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      await this.ordersService.addOrder(orderData);
      this.clearCart();
      return true;
    } catch (error) {
      console.error('Błąd podczas składania zamówienia:', error);
      return false;
    }
  }
}
