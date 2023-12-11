import { createReducer, on } from '@ngrx/store';
import {
  loadCategoriesFail,
  loadCategoriesSuccess,
  loadCategory,
} from './Categories.action';
export const categoriesState = {
  list: [],
};
const _categoriesReducer = createReducer(
  categoriesState,
  on(loadCategoriesSuccess, (state, action) => {
    return {
      ...state,
      categories: [...action.categories],
    };
  }),
  on(loadCategoriesFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  }),
  on(loadCategory, (state, action) => {
    return {
      ...state,
      id: action.id,
    };
  }),
  on(loadCategoriesFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  })
);

export function CategoriesReducer(state: any, action: any) {
  return _categoriesReducer(state, action);
}
