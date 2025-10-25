import { Component } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CartService, Cart } from "../../services/cart.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.css"
})
export class CheckoutComponent {
  cart: Cart;
  cartSubscription: Subscription | undefined;

  validationMessages = {
    cardNumber: [
      {
        type: "required",
        message: "Card number is required"
      }
    ],
    expiryDate: [
      {
        type: "required",
        message: "Expiry date is required"
      },
      {
        type: "pattern",
        message: "Expiry date must be a valid date"
      }
    ],
    cvv: [
      {
        type: "required",
        message: "CVV is required"
      },
      {
        type: "maxlength",
        message: "CVV must be 4 characters"
      }
    ],
    email: [{
      type: "required",
      message: "Email is required"
    },
      {
        type: "pattern",
        message: "Email must be a valid email address"
      }]
    ,
    address: [
      {
        type: "required",
        message: "Address is required"
      },
      {
        type: "minlength",
        message: "Address must be at least 5 characters"
      }
    ],
    city: [
      {
        type: "required",
        message: "City is required"
      }
    ],
    region: [
      {
        type: "required",
        message: "Region is required"
      }
    ],
    postalCode: [
      {
        type: "required",
        message: "Postal code is required"
      },
      {
        type: "minlength",
        message: "Postal code must be at least 5 characters"
      }
    ]
  };


  checkoutData = new FormGroup({
    cardNumber: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]{16}$")
    ]),
    expiryDate: new FormControl("", [
      Validators.required,
      Validators.pattern("^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$") // MM/YY
    ]),
    cvv: new FormControl("", [Validators.required, Validators.maxLength(4)]),
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")
    ]),
    address: new FormControl("", [Validators.required, Validators.minLength(5)]),
    city: new FormControl("", Validators.required),
    region: new FormControl("", Validators.required),
    postalCode: new FormControl("", [Validators.required, Validators.minLength(5)])
  });

  constructor(private http: HttpService, private _router: Router, private cartService: CartService) {
    this.cart = {};
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe(cart => {
      this.cart = cart;
    });
  };

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  };

  submitCheckout() {
    console.log(this.checkoutData.status, "status");
    console.log(this.checkoutData.value);
    this.cart = {
      ...this.cart,
      checkout: {
        cardNumber: this.checkoutData.value.cardNumber!,
        expiryDate: this.checkoutData.value.expiryDate!,
        cvv: this.checkoutData.value.cvv!,
        email: this.checkoutData.value.email!,
        address: this.checkoutData.value.address!,
        city: this.checkoutData.value.city!,
        region: this.checkoutData.value.region!,
        postalCode: this.checkoutData.value.postalCode!
      }
    };
    this.cartService.updateCart(this.cart);
    this._router.navigateByUrl("/confirm");


  }
}
