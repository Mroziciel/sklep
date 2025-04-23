import { Product } from './product';

export interface OrderProduct {
  id: string | number;
  name: string;
  price: number;
}

export interface Order {
  id: string | number;
  products: OrderProduct[];
  total: number;
  date: string;
}
