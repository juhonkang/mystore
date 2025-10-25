import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CartService, Cart} from "../../services/cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirm.component.html',
  styleUrl: './order-confirm.component.css'
})
export class OrderConfirmComponent {
  cart: Cart = {}
  cartSubscription: Subscription | undefined

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe(cart => {
      this.cart = cart;
    });
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
