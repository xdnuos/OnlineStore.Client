import { createAction, props } from '@ngrx/store';
import { Order, orderDetails } from '../model/Order.model';

export const LOAD_ORDERS = '[Orders] Load Orders';
export const LOAD_ORDERS_SUCCESS = '[Orders] Load Orders success';
export const LOAD_ORDERS_FAIL = '[Orders] Load Orders fail';

export const LOAD_CANCEL_ORDERS = '[Orders] Load Cancel Orders';
export const LOAD_CANCEL_ORDERS_SUCCESS = '[Orders] Load Cancel Orders success';
export const LOAD_CANCEL_ORDERS_FAIL = '[Orders] Load Cancel Orders fail';

export const CREATE_ORDER = '[Orders] Create order';
export const CREATE_ORDER_SUCCESS = '[Orders] Create order success';
export const CREATE_ORDER_FAIL = '[Orders] Create order fail';

export const loadOrderPagination = createAction(
  LOAD_ORDERS,
  props<{
    page: number;
    limit: number;
  }>()
);
export const loadOrderPaginationSuccess = createAction(
  LOAD_ORDERS_SUCCESS,
  props<{ list: Order[]; total: number }>()
);
export const changePage = createAction(
  '[Order] Change Page',
  props<{ page: number }>()
);
export const loadOrderPaginationFail = createAction(
  LOAD_ORDERS_FAIL,
  props<{ errorMessage: string }>()
);

export const loadOrderCancelPagination = createAction(
  LOAD_ORDERS,
  props<{
    page: number;
    limit: number;
  }>()
);
export const loadOrderCancelPaginationSuccess = createAction(
  LOAD_CANCEL_ORDERS_SUCCESS,
  props<{ list: Order[]; total: number }>()
);
export const changePageCancel = createAction(
  '[Order] Change Page',
  props<{ page: number }>()
);
export const loadOrderCancelPaginationFail = createAction(
  LOAD_CANCEL_ORDERS_FAIL,
  props<{ errorMessage: string }>()
);

//TODO: chưa test
export const createOrder = createAction(
  CREATE_ORDER,
  props<{ req: orderDetails[] }>()
);
export const createOrderSuccess = createAction(
  CREATE_ORDER_SUCCESS,
  props<{ obj: Order }>()
);
export const loadOrderFail = createAction(
  CREATE_ORDER_FAIL,
  props<{ errorMessage: string }>()
);
