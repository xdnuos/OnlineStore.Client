import { createAction, props } from '@ngrx/store';
import { BaseCategory, Category } from '../model/Category.model';

export const LOAD_CATEGORIES = '[Categories] Load categories';
export const LOAD_CATEGORIES_SUCCESS = '[Categories] Load categories success';
export const LOAD_CATEGORIES_FAIL = '[Categories] Load categories fail';

export const LOAD_CATEGORY = '[Category] Load category';
export const LOAD_CATEGORY_SUCCESS = '[Category] Load category success';
export const LOAD_CATEGORY_FAIL = '[Category] Load category fail';

export const loadCategories = createAction(LOAD_CATEGORIES);
export const loadCategoriesSuccess = createAction(
  LOAD_CATEGORIES_SUCCESS,
  props<{ categories: BaseCategory[] }>()
);
export const loadCategoriesFail = createAction(
  LOAD_CATEGORIES_FAIL,
  props<{ errorMessage: string }>()
);

export const loadCategory = createAction(
  LOAD_CATEGORY,
  props<{ id: number }>()
);
export const loadCategorySuccess = createAction(
  LOAD_CATEGORY_SUCCESS,
  props<{ category: Category }>()
);
export const loadCategoryFail = createAction(
  LOAD_CATEGORY_FAIL,
  props<{ errorMessage: string }>()
);
