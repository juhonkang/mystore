import { Component, EventEmitter, Input, input, Output } from "@angular/core";
import {HttpService} from "../../services/http.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Product, ProductsService} from "../../services/products.service";
import {CartService} from "../../services/cart.service";


@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    NgOptimizedImage, CommonModule, FormsModule, RouterLink
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  @Output() productAdded = new EventEmitter<Product>();
  @Input() products: Product[] = []

  constructor(private httpService: HttpService, private router: Router, private productService: ProductsService, private cartService: CartService) {

  }

  ngOnInit() {

  }

  addToCart(product: Product) {
    const productToAdd = this.products.find((p) => p.id === product.id);
    if (productToAdd) {
      this.productAdded.emit(productToAdd);
    }
  }
}
