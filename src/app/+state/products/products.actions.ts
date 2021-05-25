import { createAction, props } from "@ngrx/store";
import { ProductsEntity, ProductsFilter } from "./products.models";
import { Page } from '../api.models';
import { Update } from '@ngrx/entity';

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
  props<{ products: Page<ProductsEntity> }>()
);

export const viewProductDetails = createAction(
  "[Products/API] View Product Details",
  props<{ productId: number }>()
);

export const viewProductDetailsSuccess = createAction(
  "[Products/API] View Product Details Success",
  props<{ update: Update<ProductsEntity> }>()
);

export const toggleFilter = createAction(
  "[Products/API] Toggle Filter",
  props<{ displayFilter: boolean }>()
);