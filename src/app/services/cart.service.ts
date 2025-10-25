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

  private readonly CART_STORAGE_KEY = 'mystore_cart';
  private _cart: BehaviorSubject<Cart> = new BehaviorSubject({});

  constructor(private http: HttpClient, private productsService: ProductsService) {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    try {
      const savedCart = localStorage.getItem(this.CART_STORAGE_KEY);
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        this._cart.next(cart);
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
  }

  private saveCartToStorage(cart: Cart): void {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  clearCart(): void {
    this._cart.next({});
    localStorage.removeItem(this.CART_STORAGE_KEY);
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
            this.saveCartToStorage(updatedCart);
        }
    }

  updateCart(cart: Cart): void {
    this._cart.next(cart);
    this.saveCartToStorage(cart);
  }

  addToCart(product: Product): void {
    const existingProductIndex = this._cart.value.products?.findIndex(p => p.id === product.id);
    console.log({existingProductIndex})

    if (existingProductIndex !== undefined && existingProductIndex > -1) {
      // Product exists, update quantity by adding the new quantity to existing
      const updatedProducts = this._cart.value.products?.map((existingProduct, index) => {
        if (index === existingProductIndex) {
          return {...existingProduct, quantity: existingProduct.quantity + product.quantity};
        }
        return existingProduct;
      });

      const updatedCart = {
        ...this._cart.value,
        products: updatedProducts,
        total: this.calculateTotalPrice(updatedProducts as Product[]),
      };
      this._cart.next(updatedCart);
      this.saveCartToStorage(updatedCart);
    } else {
      // Product does not exist, add new
      const updatedProducts = this._cart.value.products ? [...this._cart.value.products, product] : [product];
      console.log({updatedProducts});
      const updatedCart = {
        ...this._cart.value,
        products: updatedProducts,
        total: this.calculateTotalPrice(updatedProducts),
      };

      this._cart.next(updatedCart);
      this.saveCartToStorage(updatedCart);
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
