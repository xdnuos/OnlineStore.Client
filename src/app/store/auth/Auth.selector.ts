import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './Auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('user');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);
export const isUserLoggedIn = createSelector(
  selectAuthState,
  (state) => !!localStorage.getItem('user')
);
export const getError = createSelector(
  selectAuthState,
  (state) => state.errorMessage
);
