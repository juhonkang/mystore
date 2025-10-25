import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './products.service';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {
  private _searchTerm = new BehaviorSubject<string>('');
  private _selectedCategory = new BehaviorSubject<string>('all');
  private _sortOption = new BehaviorSubject<SortOption>('default');

  public readonly searchTerm$ = this._searchTerm.asObservable();
  public readonly selectedCategory$ = this._selectedCategory.asObservable();
  public readonly sortOption$ = this._sortOption.asObservable();

  setSearchTerm(term: string): void {
    this._searchTerm.next(term.toLowerCase());
  }

  setCategory(category: string): void {
    this._selectedCategory.next(category);
  }

  setSortOption(option: SortOption): void {
    this._sortOption.next(option);
  }

  filterAndSortProducts(products: Product[]): Observable<Product[]> {
    return combineLatest([
      this._searchTerm,
      this._selectedCategory,
      this._sortOption
    ]).pipe(
      map(([searchTerm, category, sortOption]) => {
        let filtered = [...products];

        // Filter by search term
        if (searchTerm) {
          filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
          );
        }

        // Filter by category
        if (category !== 'all') {
          filtered = filtered.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
          );
        }

        // Sort products
        switch (sortOption) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'name-asc':
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'name-desc':
            filtered.sort((a, b) => b.title.localeCompare(a.title));
            break;
          case 'rating-desc':
            filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
            break;
          default:
            // Keep original order
            break;
        }

        return filtered;
      })
    );
  }

  getUniqueCategories(products: Product[]): string[] {
    const categories = products.map(p => p.category);
    return Array.from(new Set(categories)).sort();
  }

  reset(): void {
    this._searchTerm.next('');
    this._selectedCategory.next('all');
    this._sortOption.next('default');
  }
}
