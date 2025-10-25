import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {Product} from "../../services/products.service";
import {CartService} from "../../services/cart.service";
import {WishlistService} from "../../services/wishlist.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productId: number | undefined;
  product: Product | undefined;
  isInWishlist: boolean = false;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private notificationService: NotificationService
  ) {
    this.route.params.subscribe(params => {
      this.productId = parseInt(params['id']);
      this.product = {
        title: '',
        image: '',
        price: 1,
        category: '',
        id: this.productId,
        quantity: 1,
        description: '',
        rating: {
          count: 0,
          rate: 0
        }
      }
    });

  }

  ngOnInit() {
    if (this.productId) {
      this.http.getProduct(this.productId).subscribe({
        next: (data) => {
          console.log(data)
          this.product = data
          this.product.quantity = 1
          this.checkWishlistStatus();
        },
        error: (error) => {
          this.notificationService.error('Failed to load product details.');
          console.error('Error loading product:', error);
        }
      });
    }
  }

  checkWishlistStatus(): void {
    if (this.productId) {
      this.isInWishlist = this.wishlistService.isInWishlist(this.productId);
    }
  }

  addToCart(product: Product | undefined) {
    if (product) {
      const productWithQuantity = {
        ...product,
        quantity: product.quantity
      };
      console.log({productWithQuantity})
      this.cartService.addToCart(productWithQuantity);
      this.notificationService.success(`${product.title} added to cart!`);
    }
  }

  toggleWishlist(): void {
    if (this.product) {
      if (this.isInWishlist) {
        this.wishlistService.removeFromWishlist(this.product.id);
        this.notificationService.info('Removed from wishlist');
      } else {
        this.wishlistService.addToWishlist(this.product);
        this.notificationService.success('Added to wishlist!');
      }
      this.checkWishlistStatus();
    }
  }

}
