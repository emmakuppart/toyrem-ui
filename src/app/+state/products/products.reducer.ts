import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import * as ProductsActions from "./products.actions";
import { ProductsEntity, ProductsFilter } from "./products.models";

export const PRODUCTS_FEATURE_KEY = "products";

export interface State extends EntityState<ProductsEntity> {
  filter: ProductsFilter;
  count?: number;
  selectedId?: number;
  displayFilter: boolean;
}

export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: State;
}

export const productsAdapter: EntityAdapter<ProductsEntity> = createEntityAdapter<ProductsEntity>();

export const initialState: State = productsAdapter.getInitialState({
  filter: new ProductsFilter(),
  displayFilter: false
});

const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state, { categoriesIds }) => ({
    ...state,
    filter: new ProductsFilter(categoriesIds),
    displayFilter: false
  })),
  on(ProductsActions.loadProductsByFilter, (state, { filter }) => ({
    ...state,
    filter: {
      ...state.filter,
      name: filter.name,
      code: filter.code,
      lang: filter.lang
    }
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) =>
    productsAdapter.setAll(products.results, {
      ...state,
      count: products.count
    })
  ),
  on(ProductsActions.viewProductDetails, (state, { productId }) => ({
    ...state,
    selectedId: productId,
    displayFilter: false
  })),
  on(ProductsActions.toggleFilter, (state, { displayFilter }) => ({
    ...state,
    displayFilter: !displayFilter ? !state.displayFilter : displayFilter
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}
