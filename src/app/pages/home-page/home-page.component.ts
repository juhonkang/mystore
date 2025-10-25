import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsListComponent} from "../../components/products-list/products-list.component";
import {ProductFilterComponent} from "../../components/product-filter/product-filter.component";
import { Product, ProductsService } from "../../services/products.service";
import { CartService } from "../../services/cart.service";
import { HttpService } from "../../services/http.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../services/notification.service";
import { ProductFilterService } from "../../services/product-filter.service";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    ProductsListComponent,
    ProductFilterComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading: boolean = false;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private productService: ProductsService,
    private cartService: CartService,
    private notificationService: NotificationService,
    private filterService: ProductFilterService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.httpService.getProducts().subscribe({
      next: (data) => {
        console.log(data, 'products')
        this.allProducts = data
        this.allProducts.forEach((product) => {
          product.quantity = 1;
        })
        this.productService.updateProducts(this.allProducts)

        // Subscribe to filtered products
        this.filterService.filterAndSortProducts(this.allProducts).subscribe(filtered => {
          this.filteredProducts = filtered;
        });

        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load products. Please try again later.');
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  handleProductAdded(product:Product) {
    console.log(product, 'product')
    const productWithQuantity = {
      ...product,
      quantity: product.quantity
    };
    this.cartService.addToCart(productWithQuantity)
    this.notificationService.success(`${product.title} added to cart!`);
  }

}
