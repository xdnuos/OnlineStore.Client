import { createReducer, on } from '@ngrx/store';
import {
  changePage,
  findByCategoryAction,
  loadProductFail,
  loadProductPaginationFail,
  loadProductPaginationSuccess,
  loadProductSuccess,
  searchAction,
  sortAction,
} from './Product.action';
import { ProductPaginationState } from './Product.state';

const _productReducer = createReducer(
  ProductPaginationState,
  on(loadProductPaginationSuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      total: action.total,
    };
  }),
  on(loadProductPaginationFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  }),
  on(loadProductSuccess, (state, action) => {
    return {
      ...state,
      obj: action.obj,
      errorMessage: '',
    };
  }),
  on(loadProductFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  }),
  on(changePage, (state, { page }) => ({
    ...state,
    currentPage: page,
  })),
  on(searchAction, (state, { search }) => ({
    ...state,
    search: search,
  })),
  on(findByCategoryAction, (state, { categoryID }) => ({
    ...state,
    category: categoryID,
  })),
  on(sortAction, (state, { sortBy, order }) => ({
    ...state,
    sortBy: sortBy,
    order: order,
  }))
);

export function ProductReducer(state: any, action: any) {
  return _productReducer(state, action);
}
