import { Injectable } from "@angular/core";

import { createEffect, Actions, ofType } from "@ngrx/effects";
import { select, Store } from '@ngrx/store';
import { fetch } from "@nrwl/angular";
import { concatMap, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { CategoriesService } from './categories.service';
import * as CategoriesActions from './categories.actions';
import * as ProductsActions from '../products/products.actions';
import * as CategoriesSelectors from './categories.selectors';
import { CategoriesEntity } from './categories.models';

@Injectable()
export class CategoriesEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.init),
      fetch({
        run: (a) => this.categoriesService.getCategories().pipe(map(categories =>
          CategoriesActions.loadCategoriesSuccess({
            categories: categories
          })))
      })
    )
  );

  selectCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.selectCategory),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(CategoriesSelectors.getChildrenCategories))
          )
        )
      ),
      fetch({
        run: (a, children: CategoriesEntity[]) => ProductsActions.loadProducts({
          categoriesIds: [...children.map(category => category.id), a.category.id]
        })
      })
    )
  );

  constructor(private actions$: Actions,
              private store: Store,
              private categoriesService: CategoriesService) {}
}
