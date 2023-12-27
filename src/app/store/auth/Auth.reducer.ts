import { createReducer, on } from '@ngrx/store';
import { User } from '../model/User.model';
import {
  login,
  loginFail,
  loginSuccess,
  register,
  registerFail,
  registerSuccess,
} from './Auth.action';
export interface AuthState {
  user: User | null;
  token: string | null;
  errorMessage?: string;
  isLoading?: boolean;
}

// Initial state
export const authInitialState: AuthState = {
  user: null,
  token: null,
};
const _authReducer = createReducer(
  authInitialState,
  on(login, (state, action) => {
    return {
      ...state,
      user: null,
      token: null,
      isLoading: true,
    };
  }),
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      token: action.token,
      isLoading: false,
    };
  }),
  on(loginFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
      user: null,
      token: null,
      isLoading: false,
    };
  }),
  on(register, (state, action) => {
    return {
      ...state,
      user: null,
      token: null,
      isLoading: true,
    };
  }),
  on(registerSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      token: action.token,
      isLoading: false,
    };
  }),
  on(registerFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
      user: null,
      token: null,
      isLoading: false,
    };
  })
);

export function AuthReducer(state: any, action: any) {
  return _authReducer(state, action);
}
