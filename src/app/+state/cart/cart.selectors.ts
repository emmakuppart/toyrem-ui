import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  CART_FEATURE_KEY,
  State,
  CartPartialState,
  cartAdapter,
} from "./cart.reducer";
import { CountdownConfig } from 'ngx-countdown/interfaces';

const getCartState = createFeatureSelector<CartPartialState, State>(
  CART_FEATURE_KEY
);

const { selectAll, selectEntities } = cartAdapter.getSelectors();

export const getCart = createSelector(getCartState, (state: State) => state.cart);

export const getAllCartItems = createSelector(getCartState, (state: State) => selectAll(state));

export const getCartItemsEntities = createSelector(getCartState, (state: State) => selectEntities(state));

export const getItemsCount = createSelector(getAllCartItems, (items) => items.length);

export const getQtyPerProduct = createSelector(getAllCartItems, (items) => {
  return items?.reduce((result, item) => {
    result[item.product.id] = item.quantity;
    return result;
  }, {});
});

export const getCountdownConfig = createSelector(getCartState, (state) =>
  state.cart?.expires
    ? ({ stopTime: new Date(state.cart.expires).getTime() } as CountdownConfig)
    : undefined
);
