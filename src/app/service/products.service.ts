import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:5000";

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`).pipe(
      catchError(this.handleError)
    );
  }

  addProducts(product:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, {product}).pipe(
      catchError(this.handleError)
    );
  }

  editProducts(product:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${product.id}`, {product}).pipe(
      catchError(this.handleError)
    );
  }

  deleteProducts(productId:any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${productId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error); // Log the error for further inspection
    return throwError('Something went wrong; please try again later.');
  }
}
