import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CartService, Cart} from "../../services/cart.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  cart: Cart = {}
  cartSubscription: Subscription | undefined;

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
}
