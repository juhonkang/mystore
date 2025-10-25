import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly WISHLIST_STORAGE_KEY = 'mystore_wishlist';
  private _wishlist = new BehaviorSubject<Product[]>([]);
  public readonly wishlist$ = this._wishlist.asObservable();

  constructor() {
    this.loadWishlistFromStorage();
  }

  private loadWishlistFromStorage(): void {
    try {
      const savedWishlist = localStorage.getItem(this.WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        const wishlist = JSON.parse(savedWishlist);
        this._wishlist.next(wishlist);
      }
    } catch (error) {
      console.error('Error loading wishlist from storage:', error);
    }
  }

  private saveWishlistToStorage(wishlist: Product[]): void {
    try {
      localStorage.setItem(this.WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error saving wishlist to storage:', error);
    }
  }

  addToWishlist(product: Product): void {
    const currentWishlist = this._wishlist.value;
    const exists = currentWishlist.some(p => p.id === product.id);

    if (!exists) {
      const updatedWishlist = [...currentWishlist, product];
      this._wishlist.next(updatedWishlist);
      this.saveWishlistToStorage(updatedWishlist);
    }
  }

  removeFromWishlist(productId: number): void {
    const currentWishlist = this._wishlist.value;
    const updatedWishlist = currentWishlist.filter(p => p.id !== productId);
    this._wishlist.next(updatedWishlist);
    this.saveWishlistToStorage(updatedWishlist);
  }

  isInWishlist(productId: number): boolean {
    return this._wishlist.value.some(p => p.id === productId);
  }

  clearWishlist(): void {
    this._wishlist.next([]);
    localStorage.removeItem(this.WISHLIST_STORAGE_KEY);
  }

  getWishlist(): Product[] {
    return this._wishlist.value;
  }
}
