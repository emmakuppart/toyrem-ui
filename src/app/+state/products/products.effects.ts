import { Injectable } from "@angular/core";

import { select, Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { concatMap, map, withLatestFrom } from 'rxjs/operators';
import { fetch } from "@nrwl/angular";

import * as ProductsSelectors from "./products.selectors";
import * as ProductsActions from "./products.actions";
import { ProductsService } from './products.service';
import { of } from 'rxjs';
import { ProductsEntity, ProductsFilter } from './products.models';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(ProductsSelectors.getFilter))
          )
        )
      ),
      fetch({
        run: (a, filter: ProductsFilter) =>
          this.productsService.getProducts(filter).pipe(map(
            products => ProductsActions.loadProductsSuccess({
              products: products
            })
          ))
      })
    )
  );

  loadProductImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.viewProductDetails),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(ProductsSelectors.getSelectedProduct))
          )
        )
      ),
      fetch({
        run: (a, product: ProductsEntity) =>
          this.productsService.getProductImages(a.productId).pipe(map(
            images => ProductsActions.viewProductDetailsSuccess({
              update: {
                id: a.productId,
                changes: {
                  additionalImages: images
                }
              }
            })
          ))
      })
    )
  );

  constructor(private actions$: Actions,
              private store: Store,
              private productsService: ProductsService) {}
}
