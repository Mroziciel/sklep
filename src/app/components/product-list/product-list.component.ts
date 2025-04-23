import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styles: []
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  allProducts: Product[] = [];
  categories: {id: number, name: string}[] = [];
  selectedCategory: string = '';
  private cartService = inject(CartService);

  async ngOnInit() {
    await this.loadProducts();
    await this.loadCategories();
  }

  async loadProducts() {
    const response = await fetch('http://localhost:3000/products');
    this.allProducts = await response.json();
    this.products = [...this.allProducts];
  }

  async loadCategories() {
    const response = await fetch('http://localhost:3000/categories');
    this.categories = await response.json();
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.products = category
      ? this.allProducts.filter(p => p.category === category)
      : [...this.allProducts];
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
