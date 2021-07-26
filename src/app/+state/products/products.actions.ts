import { createAction, props } from "@ngrx/store";
import { Product, ProductsFilter } from "./products.models";
import { Page } from '../api.models';

export const loadProducts = createAction(
  "[Products Page] Load Products",
  props<{ categoriesIds: number[] }>()
);

export const loadProductsByFilter = createAction(
  "[Products Page] Load Products By Filter",
  props<{ filter: ProductsFilter }>()
);

export const loadProductsSuccess = createAction(
  "[Products/API] Load Products Success",
  props<{ products: Page<Product> }>()
);

export const loadProduct = createAction(
  "[Products/API] Load Product",
  props<{ productId: number }>()
);

export const loadProductSuccess = createAction(
  "[Products/API] Load Product Success",
  props<{ product: Product }>()
);

export const loadProductFailure = createAction(
  "[Products/API] Load Product Failure"
);

export const toggleFilter = createAction(
  "[Products/API] Toggle Filter",
  props<{ displayFilter: boolean }>()
);