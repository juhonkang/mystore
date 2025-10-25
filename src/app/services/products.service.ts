import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface Product {
  title: string;
  price: number;
  image: string;
  category: string;
  id: number;
  quantity: number;
  description: string;
  rating:{
    count:number;
    rate:number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _products:BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  get products():Product[]{
    return this._products.value;
  }

  updateProducts(products: Product[]): void {
    this._products.next(products);
  }
}
