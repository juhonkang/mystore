import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {Product} from "../../services/products.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productId: number | undefined;
  product: Product | undefined;

  constructor(private http: HttpService, private route: ActivatedRoute,private cartService: CartService) {
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
      this.http.getProduct(this.productId).subscribe(data => {
        console.log(data)
        this.product = data
        this.product.quantity = 1
      })
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
      alert('Product Added to the cart!')
    }
  }

}
