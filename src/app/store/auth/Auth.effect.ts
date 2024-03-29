import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/localStrorage.service';
import * as authActions from './Auth.action';
@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap((action) => {
        return this.authService.login(action.req).pipe(
          map((data) => {
            console.log(data);
            this.localStorageService.set('token', data.token);
            this.localStorageService.set('user', data.user);
            return authActions.loginSuccess({
              user: data.user,
              token: data.token,
            });
          }),
          catchError((_error) =>
            of(
              authActions.loginFail({
                errorMessage: _error.message,
              })
            )
          )
        );
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      exhaustMap((action) => {
        return this.authService.register(action.req).pipe(
          map((data) => {
            this.localStorageService.set('token', data.token);
            this.localStorageService.set('user', data.user);
            return authActions.registerSuccess({
              user: data.user,
              token: data.token,
            });
          }),
          catchError((_error) =>
            of(
              authActions.registerFail({
                errorMessage: _error.message,
              })
            )
          )
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      exhaustMap(() => {
        this.authService.logOut();
        return of(authActions.logoutSuccess());
      })
    )
  );
}
