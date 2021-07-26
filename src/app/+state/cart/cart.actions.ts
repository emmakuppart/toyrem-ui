import { createAction, props } from "@ngrx/store";
import { CartEntity, CartItemEntity } from "./cart.models";
import { Update } from '@ngrx/entity';

export const loadCart = createAction(
  "[Cart/API] Load Cart"
);

export const loadCartSuccess = createAction(
  "[Cart/API] Load Cart Success",
  props<{ cart: CartEntity }>()
);

export const loadCartOnAdd = createAction(
  "[Cart/API] Load Cart Before Adding Item",
  props<{ productId: number, quantity: number }>()
);

export const addItem = createAction(
  "[Cart/API] Add Item",
  props<{ cart: CartEntity, productId: number, quantity: number }>()
);

export const addItemSuccess = createAction(
  "[Cart/API] Add Item Success",
  props<{ item: CartItemEntity }>()
);

export const addItemFailure = createAction(
  "[Cart/API] Add Item Failure"
);

export const increaseQty = createAction(
  "[Cart/API] Increase Quantity",
  props<{ itemId: number }>()
);

export const increaseQtySuccess = createAction(
  "[Cart/API] Increase Quantity Success"
);

export const increaseQtyFailure = createAction(
  "[Cart/API] Increase Quantity Failure"
);

export const decreaseQty = createAction(
  "[Cart/API] Decrease Quantity",
  props<{ itemId: number }>()
);

export const decreaseQtySuccess = createAction(
  "[Cart/API] Decrease Quantity Success"
);

export const decreaseQtyFailure = createAction(
  "[Cart/API] Decrease Quantity Failure"
);