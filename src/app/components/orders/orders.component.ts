import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import { Order} from '../../models/order';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit{
  orders: Order[] = [];
  newProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: 0,
    category: 'Naczynia'
  };
  async ngOnInit(){
    await this.loadOrders();
  }
  async loadOrders(){
    const res = await fetch('http://localhost:3000/orders');
    this.orders = await res.json();
  }

  async deleteOrder(id: number){
    await fetch(`http://localhost:3000/orders/${id}`, {method: 'DELETE'})
    await this.loadOrders();
  }

  async addProduct(){
    await fetch(`http://localhost:3000/products`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(this.newProduct)});
  this.newProduct = {
    id: 0,
    name: '',
    image: '',
    price: 0,
    category: 'Naczynia'
    };
  }
}
