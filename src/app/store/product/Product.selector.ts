import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaginationProduct } from '../model/Product.model';

export const selectProductsState =
  createFeatureSelector<PaginationProduct>('products');

export const selectProducts = createSelector(
  selectProductsState,
  (state) => state.list
);

export const selectTotal = createSelector(
  selectProductsState,
  (state) => state.total
);

export const selectCurrentPage = createSelector(
  selectProductsState,
  (state) => state.currentPage
);
export const getState = createSelector(selectProductsState, (state) => state);
