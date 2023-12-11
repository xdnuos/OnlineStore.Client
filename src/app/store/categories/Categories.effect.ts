import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import * as categoriesActions from './Categories.action';
@Injectable()
export class CategoriesEffect {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.loadCategories),
      exhaustMap((action) => {
        return this.categoriesService.getCategories().pipe(
          map((data) => {
            return categoriesActions.loadCategoriesSuccess({
              categories: data,
            });
          }),
          catchError((_error) =>
            of(
              categoriesActions.loadCategoriesFail({
                errorMessage: _error.message,
              })
            )
          )
        );
      })
    )
  );
  loadCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.loadCategory),
      exhaustMap((action) => {
        return this.categoriesService.getByID(action.id).pipe(
          map((data) => {
            return categoriesActions.loadCategorySuccess({ category: data });
          }),
          catchError((_error) =>
            of(
              categoriesActions.loadCategoryFail({
                errorMessage: _error.message,
              })
            )
          )
        );
      })
    )
  );
}
