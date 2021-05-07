import { Injectable } from "@angular/core";

import { select, Store } from "@ngrx/store";

import * as ProductsSelectors from "./products.selectors";
import * as ProductsActions from "./products.actions";

@Injectable()
export class ProductsFacade {
  products$ = this.store.pipe(select(ProductsSelectors.getChunkedProducts));
  count$ = this.store.pipe(select(ProductsSelectors.getProductsCount));
  filter$ = this.store.pipe(select(ProductsSelectors.getFilter));
  selectedProduct$ = this.store.pipe(select(ProductsSelectors.getSelectedProduct));

  constructor(private store: Store) {}

  loadOverviewProducts(): void {
    this.store.dispatch(ProductsActions.loadProducts({ categoriesIds: undefined }));
  }

  viewProductDetails(productId: number): void {
    this.store.dispatch(ProductsActions.viewProductDetails({ productId: productId }));
  }
}
