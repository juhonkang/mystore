import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpService} from "../../services/http.service";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CartService,Cart} from "../../services/cart.service";
import {Product} from "../../services/products.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cart: Cart
  cartSubscription: Subscription | undefined;
  constructor(private http: HttpService,private cartService: CartService) {
    this.cart = {}
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  updateCartTotal(newQuantity: Event, product: any) {
    // Update the product quantity with the new value
    console.log(newQuantity, 'newQuantity')


    // Recalculate the cart total
    let newTotal = 0;
    this.cart.products?.forEach((product: Product) => {
      newTotal += product.price * product.quantity;
    });
    this.cart.total = newTotal;
    this.cartService.updateCart(this.cart)
  }

  removeFromCart(product: Product): void {
      this.cartService.removeFromCart(product);
      alert('Product removed from the cart!')
  }
}
