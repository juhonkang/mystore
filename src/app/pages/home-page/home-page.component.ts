import { Component } from '@angular/core';
import {ProductsListComponent} from "../../components/products-list/products-list.component";
import { Product, ProductsService } from "../../services/products.service";
import { CartService } from "../../services/cart.service";
import { HttpService } from "../../services/http.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ProductsListComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  products: Product[]
  constructor(private httpService: HttpService, private router: Router, private productService: ProductsService, private cartService: CartService) {
    this.products = []
  }

  ngOnInit() {
    this.httpService.getProducts().subscribe(data => {
      console.log(data, 'products')
      this.products = data
      this.products.forEach((product) => {
        product.quantity = 1;
      })
      this.productService.updateProducts(this.products)
    })


  }



  handleProductAdded(product:Product) {
    console.log(product, 'product')
    const productWithQuantity = {
      ...product,
      quantity: product.quantity
    };
    this.cartService.addToCart(productWithQuantity)
    alert('Product Added to the cart!')
  }

}
