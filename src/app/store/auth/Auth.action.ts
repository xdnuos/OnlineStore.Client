import { createAction, props } from '@ngrx/store';
import { LoginUser, RegisterUser, User } from '../model/User.model';
//---------------------Login---------------------
export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login success';
export const LOGIN_FAIL = '[Auth] Login fail';

export const login = createAction(LOGIN, props<{ req: LoginUser }>());
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User; token: string }>()
);
export const loginFail = createAction(
  LOGIN_FAIL,
  props<{ errorMessage: string }>()
);
//---------------------Register---------------------
export const REGISTER = '[Auth] Register';
export const REGISTER_SUCCESS = '[Auth] Register success';
export const REGISTER_FAIL = '[Auth] Register fail';
export const register = createAction(REGISTER, props<{ req: RegisterUser }>());
export const registerSuccess = createAction(
  REGISTER_SUCCESS,
  props<{ user: User; token: string }>()
);
export const registerFail = createAction(
  REGISTER_FAIL,
  props<{ errorMessage: string }>()
);
//---------------------Logout---------------------
export const LOGOUT = '[Auth] Logout';
export const LOGOUT_SUCCESS = '[Auth] Logout success';
export const logout = createAction(LOGOUT);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
