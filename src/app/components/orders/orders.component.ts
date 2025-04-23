import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  error: string = '';
  deletingOrderId: string | number | null = null;
  newProduct = {
    name: '',
    image: '',
    price: 0,
    category: 'Naczynia'
  };

  constructor(private ordersService: OrdersService) {}

  async ngOnInit() {
    await this.loadOrders();
  }

  async loadOrders() {
    try {
      this.orders = await this.ordersService.getOrders();
      this.orders.sort((a, b) => Number(b.id) - Number(a.id));
      this.error = '';
    } catch (error) {
      this.error = 'Nie udało się załadować zamówień';
      console.error('Błąd podczas ładowania zamówień:', error);
    }
  }

  async deleteOrder(id: string | number) {
    try {
      this.deletingOrderId = id;
      await this.ordersService.deleteOrder(id);
      await this.loadOrders();
      this.error = '';
    } catch (error) {
      this.error = 'Nie udało się usunąć zamówienia';
      console.error('Błąd podczas usuwania zamówienia:', error);
    } finally {
      this.deletingOrderId = null;
    }
  }

  async addProduct() {
    // Tu dodaj logikę dodawania produktu
    console.log('Dodawanie produktu:', this.newProduct);
    // Zresetuj formularz
    this.newProduct = {
      name: '',
      image: '',
      price: 0,
      category: 'Naczynia'
    };
  }
}
