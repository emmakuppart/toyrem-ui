import { createAction, props } from "@ngrx/store";
import { CartEntity, CartItemEntity } from "./cart.models";
import { ProductsEntity } from '../products/products.models';

export const loadCart = createAction(
  "[Cart/API] Load Cart"
);

export const loadCartSuccess = createAction(
  "[Cart/API] Load Cart Success",
  props<{ cart: CartEntity }>()
);

export const loadCartOnAdd = createAction(
  "[Cart/API] Load Cart Before Adding Item",
  props<{ product: ProductsEntity, quantity: number }>()
);

export const addItem = createAction(
  "[Cart/API] Add Item",
  props<{ cart: CartEntity, product: ProductsEntity, quantity: number }>()
);

export const addItemSuccess = createAction(
  "[Cart/API] Add Item Success",
  props<{ item: CartItemEntity }>()
);

export const removeItem = createAction(
  "[Cart/API] Remove Item",
  props<{ item: CartItemEntity }>()
);

export const removeItemSuccess = createAction(
  "[Cart/API] Remove Item Success",
  props<{ item: CartItemEntity, allItemsDeleted: boolean }>()
);

export const updateItem = createAction(
  "[Cart/API] Update Item",
  props<{ itemId: number, quantity: number }>()
);

export const updateItemSuccess = createAction(
  "[Cart/API] Update Item Success",
  props<{ item: CartItemEntity }>()
);