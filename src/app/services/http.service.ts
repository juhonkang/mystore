import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError, BehaviorSubject} from "rxjs";
import { map, catchError, retry, finalize } from 'rxjs/operators';
import {Product} from "./products.service";
import {Cart} from '../services/cart.service'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<[]> {
    this._loading.next(true);
    return this.http.get<[]>('https://fakestoreapi.com/products').pipe(
      retry(2),
      catchError(this.handleError),
      finalize(() => this._loading.next(false))
    );
  }

  getProduct(id:number): Observable<Product> {
    this._loading.next(true);
    return this.http.get<Product>('https://fakestoreapi.com/products/' + id).pipe(
      retry(2),
      catchError(this.handleError),
      finalize(() => this._loading.next(false))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
