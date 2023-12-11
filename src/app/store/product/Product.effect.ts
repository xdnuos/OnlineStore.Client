import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { ProductService } from '../../services/product.service';
import * as productActions from './Product.action';

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.loadProductPagination),
      exhaustMap((action) => {
        return this.productService
          .getPagination(
            action.page,
            action.limit,
            action.search,
            action.sortBy,
            action.order,
            action.category
          )
          .pipe(
            map((data) => {
              return productActions.loadProductPaginationSuccess({
                list: data.list,
                total: data.total,
              });
            }),
            catchError((_error) =>
              of(
                productActions.loadProductPaginationFail({
                  errorMessage: _error.message,
                })
              )
            )
          );
      })
    )
  );
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.loadProduct),
      exhaustMap((action) => {
        return this.productService.getByID(action.id).pipe(
          map((data) => {
            return productActions.loadProductSuccess({ obj: data });
          }),
          catchError((_error) =>
            of(productActions.loadProductFail({ errorMessage: _error.message }))
          )
        );
      })
    )
  );
}
