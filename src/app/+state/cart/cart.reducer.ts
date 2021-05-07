import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import * as CartActions from "./cart.actions";
import { CartEntity, CartItemEntity } from "./cart.models";

export const CART_FEATURE_KEY = "cart";

export interface State extends EntityState<CartItemEntity> {
  cart?: CartEntity;
}

export interface CartPartialState {
  readonly [CART_FEATURE_KEY]: State;
}

export const cartAdapter: EntityAdapter<CartItemEntity> = createEntityAdapter<CartItemEntity>();

export const initialState: State = cartAdapter.getInitialState({
});

const cartReducer = createReducer(
  initialState,
  on(CartActions.addItem, (state, { cart }) => ({
    ...state,
    cart: cart
  })),
  on(CartActions.addItemSuccess, (state, { item }) =>
    cartAdapter.addOne(item, state)
  ),
  on(CartActions.removeItemSuccess, (state, { item, allItemsDeleted }) =>
    cartAdapter.removeOne(item.id, {
      ...state,
      cart: allItemsDeleted ? null : state.cart
    })
  ),
  on(CartActions.updateItemSuccess, (state, { item }) =>
    cartAdapter.updateOne({
      id: item.id,
      changes: { ...item }
    }, state)
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return cartReducer(state, action);
}
