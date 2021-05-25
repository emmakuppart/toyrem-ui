import { Injectable } from "@angular/core";

import { select, Store } from "@ngrx/store";

import * as ProductsSelectors from "./products.selectors";
import * as ProductsActions from "./products.actions";
import { ProductsFilter } from './products.models';

@Injectable()
export class ProductsFacade {
  products$ = this.store.pipe(select(ProductsSelectors.getChunkedProducts));
  count$ = this.store.pipe(select(ProductsSelectors.getProductsCount));
  filter$ = this.store.pipe(select(ProductsSelectors.getFilter));
  selectedProduct$ = this.store.pipe(select(ProductsSelectors.getSelectedProduct));
  displayFilter$ = this.store.pipe(select(ProductsSelectors.getDisplayFilter));

  constructor(private store: Store) {}

  loadOverviewProducts(): void {
    this.store.dispatch(ProductsActions.loadProducts({ categoriesIds: undefined }));
  }

  viewProductDetails(productId: number): void {
    this.store.dispatch(ProductsActions.viewProductDetails({ productId: productId }));
  }

  search(filter: ProductsFilter): void {
    this.store.dispatch(ProductsActions.loadProductsByFilter({ filter: filter }));
  }

  toggleFilter(displayFilter?: boolean): void {
    this.store.dispatch(ProductsActions.toggleFilter({ displayFilter: displayFilter }));
  }
}
