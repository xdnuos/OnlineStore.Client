import { createAction, props } from '@ngrx/store';
import { DetailProduct, SimpleProduct } from '../model/Product.model';

export const LOAD_PRODUCTS = '[Products] Load products';
export const LOAD_PRODUCTS_SUCCESS = '[Products] Load products success';
export const LOAD_PRODUCTS_FAIL = '[Products] Load products fail';

export const LOAD_PRODUCT = '[Products] Load product';
export const LOAD_PRODUCT_SUCCESS = '[Products] Load product success';
export const LOAD_PRODUCT_FAIL = '[Products] Load product fail';

export const loadProductPagination = createAction(
  LOAD_PRODUCTS,
  props<{
    page: number;
    limit: number;
    search: string;
    sortBy: string;
    order: string;
    category: number;
  }>()
);
export const loadProductPaginationSuccess = createAction(
  LOAD_PRODUCTS_SUCCESS,
  props<{ list: SimpleProduct[]; total: number }>()
);
export const changePage = createAction(
  '[Product] Change Page',
  props<{ page: number }>()
);
export const searchAction = createAction(
  '[Product] Search',
  props<{ search: string }>()
);
export const findByCategoryAction = createAction(
  '[Product] Find By Category',
  props<{ categoryID: number }>()
);
export const sortAction = createAction(
  '[Product] Sort',
  props<{ sortBy: string; order: string }>()
);
export const loadProductPaginationFail = createAction(
  LOAD_PRODUCTS_FAIL,
  props<{ errorMessage: string }>()
);

export const loadProduct = createAction(LOAD_PRODUCT, props<{ id: number }>());
export const loadProductSuccess = createAction(
  LOAD_PRODUCT_SUCCESS,
  props<{ obj: DetailProduct }>()
);
export const loadProductFail = createAction(
  LOAD_PRODUCT_FAIL,
  props<{ errorMessage: string }>()
);
