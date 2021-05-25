import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as ProductState from "./products.reducer";

const getProductsState = createFeatureSelector<
  ProductState.ProductsPartialState,
  ProductState.State
>(ProductState.PRODUCTS_FEATURE_KEY);

const { selectAll, selectEntities } = ProductState.productsAdapter.getSelectors();

const getAllProducts = createSelector(getProductsState, (state: ProductState.State) => selectAll(state));

const getProductEntities = createSelector(getProductsState, (state: ProductState.State) => selectEntities(state));

export const getFilter = createSelector(getProductsState, (state: ProductState.State) =>
  state.filter
);

export const getChunkedProducts = createSelector(getAllProducts, (products) => {
  let chunks = [], i = 0, n = products.length;
  while (i < n) {
    chunks.push(products.slice(i, i += 3));
  }
  return chunks;
});

export const getProductsCount = createSelector(getProductsState, (state: ProductState.State) =>
  state.count
);

export const getSelectedProduct = createSelector(
  getProductsState,
  getProductEntities,
  (state: ProductState.State, entities) => entities[state.selectedId]
);

export const getDisplayFilter = createSelector(getProductsState, (state: ProductState.State) =>
  state.displayFilter
);