import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environment/environment';
import { Category } from '../store/model/Category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseurl = `${environment.baseurl}/Categories`;
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseurl).pipe(
      catchError((error) => {
        console.error('Error fetching categories:', error);
        return throwError(() => error);
      })
    );
  }

  getByID(code: number): Observable<Category> {
    const url = `${this.baseurl}/${code}`;
    return this.http.get<Category>(url).pipe(
      catchError((error) => {
        console.error(`Error fetching category with code ${code}:`, error);
        return throwError(() => error);
      })
    );
  }
}
