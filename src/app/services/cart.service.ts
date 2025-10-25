import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {Product, ProductsService} from "./products.service";
import {HttpClient} from "@angular/common/http";

export interface Cart {
  id?: number | null;
  products?: Product[],
  userId?: number | null;
  total?: number;
  checkout?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    email: string;
    address: string;
    city: string;
    region: string | null
    postalCode: string | null
  }
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cart: BehaviorSubject<Cart> = new BehaviorSubject({});

  constructor(private http: HttpClient, private productsService: ProductsService) {
  }

  get cart(): Observable<Cart> {
    return this._cart.asObservable();
  }

    removeFromCart(product: Product): void {
        // Find the product in the cart
        const productIndex = this._cart.value.products?.findIndex(p => p.id === product.id);

        if (productIndex !== undefined && productIndex > -1) {
            // Product exists in the cart, we need to remove it

            let updatedProducts = this._cart.value.products as Product[];

            // Remove the product from the products array
            updatedProducts.splice(productIndex, 1);

            const updatedCart = {
                ...this._cart.value,
                products: updatedProducts,
                total: this.calculateTotalPrice(updatedProducts),
            };

            // Update the cart
            this._cart.next(updatedCart);
        }
    }

  updateCart(cart: Cart): void {
    this._cart.next(cart);
  }

  addToCart(product: Product): void {
    const existingProductIndex = this._cart.value.products?.findIndex(p => p.id === product.id);
    console.log({existingProductIndex})

    if (existingProductIndex !== undefined && existingProductIndex > -1) {
      // Product exists, update quantity
      const updatedProducts = this._cart.value.products?.map((product, index) => {
        if (index === existingProductIndex) {
          return {...product, quantity: product.quantity + product.quantity};
        }
        return product;
      });

      const updatedCart =
        {
          ...this._cart.value.products,
          products: updatedProducts,
          total: this.calculateTotalPrice(updatedProducts as Product[]),
        };
      this._cart.next(updatedCart);
    } else {
      // Product does not exist, add new
      const updatedProducts = this._cart.value.products ? [...this._cart.value.products, product] : [product];
      console.log({updatedProducts});
      const updatedCart = {
        ...this._cart.value.products,
        products: updatedProducts,
        total: this.calculateTotalPrice(updatedProducts),
      };

      this._cart.next(updatedCart);
    }
  }

  calculateTotalPrice(products: Product[]) {
    let totalPrice = 0;
    if (products && products.length > 0) {
      totalPrice = products.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
      }, 0);
    }


    return totalPrice;
  }
}
