import { createReducer, on, Action } from "@ngrx/store";
import * as OrderActions from "./order.actions";
import { Order } from './order.models';

export const ORDER_FEATURE_KEY = "order";

export interface State {
  order?: Order;
}

export interface OrderPartialState {
  readonly [ORDER_FEATURE_KEY]: State;
}

export const initialState: State = ({});

const orderReducer = createReducer(
  initialState,
  on(OrderActions.saveOrder, (state, { order }) => ({
    order: order
  })),
  on(OrderActions.saveOrderSuccess, (state, { orderId }) => ({
    order: {
      ...state.order,
      id: orderId
    }
  })),
  on(OrderActions.updateOrder, (state, { order }) => ({
    order: order
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return orderReducer(state, action);
}
