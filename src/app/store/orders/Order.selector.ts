import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderPagination } from './Order.reducer';

export const selectOrdersState =
  createFeatureSelector<OrderPagination>('orders');

export const selectOrders = createSelector(
  selectOrdersState,
  (state) => state.data
);

export const selectTotal = createSelector(
  selectOrdersState,
  (state) => state.totalCount
);

export const selectCancelOrders = createSelector(
  selectOrdersState,
  (state) => state.dataCancel
);

export const selectTotalCancel = createSelector(
  selectOrdersState,
  (state) => state.totalCancel
);

export const selectCurrentPage = createSelector(
  selectOrdersState,
  (state) => state.currentCancelPage
);
export const getState = createSelector(selectOrdersState, (state) => state);
