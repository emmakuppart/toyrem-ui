import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as ProductState from "./products.reducer";

const getProductsState = createFeatureSelector<
  ProductState.ProductsPartialState,
  ProductState.State
>(ProductState.PRODUCTS_FEATURE_KEY);

const { selectAll } = ProductState.productsAdapter.getSelectors();

export const getAllProducts = createSelector(getProductsState, (state: ProductState.State) => selectAll(state));

export const getFilter = createSelector(getProductsState, (state: ProductState.State) =>
  state.filter
);

export const getProductsCount = createSelector(getProductsState, (state: ProductState.State) =>
  state.count
);

export const getProduct = createSelector(
  getProductsState,
  (state: ProductState.State) => state.product
);

export const getDisplayFilter = createSelector(getProductsState, (state: ProductState.State) =>
  state.displayFilter
);