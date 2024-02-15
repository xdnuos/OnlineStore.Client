import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { OrdersService } from '../../services/order.service';
import * as orderActions from './Order.action';

@Injectable()
export class OrderEffect {
  constructor(private actions$: Actions, private orderService: OrdersService) {}

  loadOrderPagination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.loadOrderPagination),
      exhaustMap((action) => {
        return this.orderService.getPagination(action.page, action.limit).pipe(
          map((data) => {
            console.log('order', data);
            return orderActions.loadOrderPaginationSuccess({
              list: data.data,
              total: data.totalCount,
            });
          }),
          catchError((_error) =>
            of(
              orderActions.loadOrderPaginationFail({
                errorMessage: _error.message,
              })
            )
          )
        );
      })
    )
  );

  // loadOrderCancelPagination$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(orderActions.loadOrderCancelPagination),
  //     exhaustMap((action) => {
  //       return this.orderService
  //         .getCancelPagination(action.page, action.limit)
  //         .pipe(
  //           map((data) => {
  //             console.log('order cancel', data);
  //             return orderActions.loadOrderCancelPaginationSuccess({
  //               list: data.data,
  //               total: data.totalCount,
  //             });
  //           }),
  //           catchError((_error) =>
  //             of(
  //               orderActions.loadOrderCancelPaginationFail({
  //                 errorMessage: _error.message,
  //               })
  //             )
  //           )
  //         );
  //     })
  //   )
  // );
}
