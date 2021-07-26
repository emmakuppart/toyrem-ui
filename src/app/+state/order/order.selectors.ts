import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  ORDER_FEATURE_KEY,
  State,
  OrderPartialState,
} from "./order.reducer";

const getOrderState = createFeatureSelector<OrderPartialState, State>(ORDER_FEATURE_KEY);

export const getOrder = createSelector(getOrderState, (state: State) => state.order);
