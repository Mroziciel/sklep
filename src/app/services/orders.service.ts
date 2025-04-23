import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Order } from '../models/order';

interface Metadata {
  lastOrderId: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  async getOrders() {
    return firstValueFrom(this.http.get<Order[]>(`${this.apiUrl}/orders`));
  }

  private async getNextOrderId() {
    try {
      const metadata = await firstValueFrom(this.http.get<Metadata>(`${this.apiUrl}/metadata`));
      const nextId = metadata.lastOrderId + 1;
      await firstValueFrom(
        this.http.patch(`${this.apiUrl}/metadata`, { lastOrderId: nextId }, this.httpOptions)
      );
      return nextId;
    } catch (error) {
      console.error('Błąd podczas pobierania/aktualizacji ID:', error);
      throw error;
    }
  }

  async addOrder(orderData: Omit<Order, 'id'>) {
    const newId = await this.getNextOrderId();
    const orderWithId = {
      ...orderData,
      id: newId
    };

    return firstValueFrom(this.http.post(`${this.apiUrl}/orders`, orderWithId, this.httpOptions));
  }

  async deleteOrder(id: string | number) {
    try {
      await firstValueFrom(
        this.http.delete(`${this.apiUrl}/orders/${id}`, {
          headers: this.httpOptions.headers,
          observe: 'response'
        })
      );
      return true;
    } catch (error) {
      console.error('Błąd podczas usuwania zamówienia:', error);
      throw error;
    }
  }
}
