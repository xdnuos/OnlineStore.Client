import { createReducer, on } from '@ngrx/store';
import { Order } from '../model/Order.model';
import * as fromOrderActions from './Order.action';
export interface OrderPagination {
  data: Order[];
  totalCount: number;
  currentPage: number;
  limit: number;
  dataCancel: Order[];
  totalCancel: number;
  currentCancelPage?: number;
}
export const OrderPaginationState: OrderPagination = {
  data: [],
  totalCount: -1,
  currentPage: 1,
  limit: 20,
  dataCancel: [],
  totalCancel: -1,
  currentCancelPage: 1,
};
const _orderReducer = createReducer(
  OrderPaginationState,
  on(fromOrderActions.loadOrderPaginationSuccess, (state, action) => {
    return {
      ...state,
      data: [...action.list],
      totalCount: action.total,
    };
  }),
  on(fromOrderActions.loadOrderPaginationFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  }),

  on(fromOrderActions.changePage, (state, { page }) => ({
    ...state,
    currentPage: page,
  })),

  on(fromOrderActions.loadOrderCancelPaginationSuccess, (state, action) => {
    return {
      ...state,
      dataCancel: [...action.list],
      totalCancel: action.total,
    };
  }),
  on(fromOrderActions.loadOrderCancelPaginationFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  }),

  on(fromOrderActions.changePageCancel, (state, { page }) => ({
    ...state,
    currentCancelPage: page,
  }))
);

export function OrderReducer(state: any, action: any) {
  return _orderReducer(state, action);
}
