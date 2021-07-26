import { Injectable } from "@angular/core";
import { select, Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { concatMap, map, withLatestFrom } from 'rxjs/operators';
import { fetch } from "@nrwl/angular";
import * as ProductsSelectors from "./products.selectors";
import * as ProductsActions from "./products.actions";
import { ProductsService } from './products.service';
import { of } from 'rxjs';
import { ProductsFilter } from './products.models';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts, ProductsActions.loadProductsByFilter),
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

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProduct),
      fetch({
        run: (a) =>
          this.productsService.getProduct(a.productId).pipe(map(
            product => ProductsActions.loadProductSuccess({
              product: {
                ...product,
                id: a.productId
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
