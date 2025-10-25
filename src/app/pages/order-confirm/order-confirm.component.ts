import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CartService, Cart} from "../../services/cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.css'
})
export class OrderConfirmComponent {
  cart: Cart = {}
  cartSubscription: Subscription | undefined
  orderNumber: number = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.orderNumber = this.generateOrderNumber();
    this.cartSubscription = this.cartService.cart.subscribe(cart => {
      this.cart = cart;
    });

    // Clear the cart after order confirmation
    setTimeout(() => {
      this.cartService.clearCart();
    }, 100);
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  generateOrderNumber() {
    return Math.floor(Math.random() * 90000) + 10000;
  }

  currentDate() {
    return new Date().toLocaleDateString();
  }


}
