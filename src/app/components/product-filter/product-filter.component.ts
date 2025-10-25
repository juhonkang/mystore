import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFilterService, SortOption } from '../../services/product-filter.service';
import { Product } from '../../services/products.service';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent implements OnInit {
  @Input() allProducts: Product[] = [];

  searchTerm: string = '';
  selectedCategory: string = 'all';
  selectedSort: SortOption = 'default';
  categories: string[] = [];

  constructor(private filterService: ProductFilterService) {}

  ngOnInit(): void {
    this.updateCategories();
  }

  ngOnChanges(): void {
    this.updateCategories();
  }

  updateCategories(): void {
    if (this.allProducts.length > 0) {
      this.categories = this.filterService.getUniqueCategories(this.allProducts);
    }
  }

  onSearchChange(): void {
    this.filterService.setSearchTerm(this.searchTerm);
  }

  onCategoryChange(): void {
    this.filterService.setCategory(this.selectedCategory);
  }

  onSortChange(): void {
    this.filterService.setSortOption(this.selectedSort);
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.selectedSort = 'default';
    this.filterService.reset();
  }
}
