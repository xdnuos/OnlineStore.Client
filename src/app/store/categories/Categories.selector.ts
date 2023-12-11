import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Categories } from '../model/Category.model';

export const selectCategoriesState =
  createFeatureSelector<Categories>('categories');

export const selectCategories = createSelector(
  selectCategoriesState,
  (state) => state.categories
);
