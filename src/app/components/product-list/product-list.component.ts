import {Component, OnInit, Output, EventEmitter, output} from '@angular/core';
import { Product} from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit{
  @Output() add = new EventEmitter<Product>();

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = '';

  async ngOnInit(){
    const res = await fetch('https://localhost:3000/products')
    this.products = await res.json();
    this.filteredProducts = [...this.products];
  }
  filter(category: string){
    this.selectedCategory = category;
     this.filteredProducts = this.products.filter(p => p.category == category);
  }

  showAll(){
    this.selectedCategory = ''
    this.filteredProducts = [...this.products];
  }

  addToCart(product: Product){
    this.add.emit(product);
  }
}
