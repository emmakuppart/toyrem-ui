import { createAction, props } from "@ngrx/store";
import { Order } from './order.models';

export const saveOrder = createAction(
  "[Order/API] Save Order",
  props<{ order: Order }>()
);

export const saveOrderSuccess = createAction(
  "[Order/API] Save Order Success",
  props<{ orderId: number }>()
);

export const saveOrderFailure = createAction(
  "[Order/API] Save Order Failure"
);

export const updateOrder = createAction(
  "[Order/API] Update Order",
  props<{ order: Order }>()
);

export const updateOrderSuccess = createAction(
  "[Order/API] Update Order Success"
);

export const updateOrderFailure = createAction(
  "[Order/API] Update Order Failure"
);