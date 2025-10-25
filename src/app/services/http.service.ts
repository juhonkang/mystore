import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {Product} from "./products.service";
import {Cart} from '../services/cart.service'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<[]> {
    return this.http.get<[]>('https://fakestoreapi.com/products')
  }

  getProduct(id:number): Observable<Product> {
    return this.http.get<Product>('https://fakestoreapi.com/products/' + id)
  }


}
