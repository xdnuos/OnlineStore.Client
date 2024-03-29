import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environment/environment';
import {
  Order,
  OrderPagination,
  ProductOrder,
} from '../store/model/Order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseurl = `${environment.baseurl}` + '/orders';

  constructor(private http: HttpClient) {}

  create(req: ProductOrder[]): Observable<Order> {
    return this.http.post<Order>(this.baseurl + '/create', req).pipe(
      catchError((error) => {
        console.error('Error creating order:', error);
        return throwError(() => error);
      })
    );
  }

  getPagination(page: number, limit: number): Observable<OrderPagination> {
    const url = `${this.baseurl}?page=${page}&size=${limit}`;
    return this.http.get<OrderPagination>(url).pipe(
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return throwError(() => error);
      })
    );
  }
  // getCancelPagination(
  //   page: number,
  //   limit: number
  // ): Observable<CancelOrderPagination> {
  //   const url = `${this.baseurl}/cancel?page=${page}&size=${limit}`;
  //   const headers = getHeaders();
  //   return this.http.get<CancelOrderPagination>(url, { headers }).pipe(
  //     catchError((error) => {
  //       console.error('Error fetching orders:', error);
  //       return throwError(() => error);
  //     })
  //   );
  // }
}
