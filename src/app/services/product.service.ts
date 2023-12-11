import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { DetailProduct, PaginationProduct } from '../store/model/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseurl = `${environment.baseurl}/Products`;
  constructor(private http: HttpClient) {}

  getPagination(
    page: number,
    limit: number,
    search: string,
    sortBy: string,
    order: string,
    category: number
  ): Observable<PaginationProduct> {
    const url = `${this.baseurl}?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&order=${order}&categoryID=${category}`;
    console.log(url);
    return this.http.get<PaginationProduct>(url).pipe(
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(() => error);
      })
    );
  }

  getByID(code: number): Observable<DetailProduct> {
    const url = `${this.baseurl}/${code}`;
    return this.http.get<DetailProduct>(url).pipe(
      catchError((error) => {
        console.error(`Error fetching product with code ${code}:`, error);
        return throwError(() => error);
      })
    );
  }
  getByIDs(ids: number[]): Observable<DetailProduct> {
    const url = `${this.baseurl}` + `/GetByIds`;
    return this.http.post<DetailProduct>(url, ids).pipe(
      catchError((error) => {
        console.error(`Error fetching products:`, error);
        return throwError(() => error);
      })
    );
  }
}
