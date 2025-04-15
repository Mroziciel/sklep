import { Routes } from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {OrdersComponent} from './components/orders/orders.component';

export const routes: Routes = [{ path: 'produkty', component: ProductListComponent},
  {path: 'zamowienia', component: OrdersComponent},
  {path: '', redirectTo: 'produkty', pathMatch: 'full'},
];
