import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { fetch } from "@nrwl/angular";
import * as OrderActions from "./order.actions";
import { concatMap, map, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { OrderService } from './order.service';
import { of } from 'rxjs';
import * as CartSelectors from '../cart/cart.selectors';
import { CartEntity } from '../cart/cart.models';

@Injectable()
export class OrderEffects {
  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.saveOrder),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(CartSelectors.getCart))
          )
        )
      ),
      fetch({
        run: (action, cart: CartEntity) =>
          this.orderService.addOrder({
            ...action.order,
            cart: cart.id
          }).pipe(map(order => OrderActions.saveOrderSuccess({ orderId: order.id }))),
        onError: (action, error) => OrderActions.saveOrderFailure()
      })
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrder),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(CartSelectors.getCart))
          )
        )
      ),
      fetch({
        run: (action, cart: CartEntity) =>
          this.orderService.updateOrder({
            ...action.order,
            cart: cart.id
          }).pipe(map(order => OrderActions.updateOrderSuccess())),
        onError: (action, error) => OrderActions.updateOrderFailure()
      })
    )
  );

  constructor(private actions$: Actions,
              private store: Store,
              private orderService: OrderService) {}
}
