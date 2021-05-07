import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  CART_FEATURE_KEY,
  State,
  CartPartialState,
  cartAdapter,
} from "./cart.reducer";
import { ProductsEntity } from '../products/products.models';

const getCartState = createFeatureSelector<CartPartialState, State>(
  CART_FEATURE_KEY
);

const { selectAll } = cartAdapter.getSelectors();

export const getCart = createSelector(getCartState, (state: State) => state.cart);

export const getAllCartItems = createSelector(getCartState, (state: State) => selectAll(state));

export const getItemsCount = createSelector(getAllCartItems, (items) => items.length);

export const getQtyPerProduct = createSelector(getAllCartItems, (items) => {
  return items?.reduce((result, item) => {
    result[item.product] = item.quantity;
    return result;
  }, {});
});
