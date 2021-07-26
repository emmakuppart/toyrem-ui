import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { fetch } from "@nrwl/angular";
import * as CartActions from "./cart.actions";
import { CartService } from './cart.service';
import { concatMap, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as CartSelectors from './cart.selectors';
import { CartEntity, CartItemEntity } from './cart.models';
import { Dictionary } from '@ngrx/entity';

@Injectable()
export class CartEffects {
  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(CartSelectors.getCart))
          )
        )
      ),
      fetch({
        run: (action, cart: CartEntity) =>
          this.cartService.addCart().pipe(map(cart => CartActions.loadCartSuccess({
            cart: cart
          })))
      })
    )
  );

  loadCartOnAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCartOnAdd),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(CartSelectors.getCart))
          )
        )
      ),
      fetch({
        run: (action, cart: CartEntity) => (!cart ? this.cartService.addCart() : of(cart)).pipe(map(cart =>
          CartActions.addItem({
            cart: cart,
            productId: action.productId,
            quantity: action.quantity
          })))
      })
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addItem),
      fetch({
        run: (action) => this.cartService.addCartItem({
          product: action.productId,
          cart: action.cart.id,
          quantity: action.quantity
        }).pipe(map(item => CartActions.addItemSuccess({ item: item })))
      })
    )
  );

  increaseQty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.increaseQty),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(CartSelectors.getCartItemsEntities))
          )
        )
      ),
      fetch({
        run: (action, items: Dictionary<CartItemEntity>) =>
          this.cartService.updateCartItem(action.itemId, items[action.itemId].quantity).pipe(map(() =>
            CartActions.increaseQtySuccess()
          )),
        onError: (action, error) => CartActions.increaseQtyFailure()
      })
    )
  );

  decreaseQty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.decreaseQty),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(CartSelectors.getCartItemsEntities))
          )
        )
      ),
      fetch({
        run: (action, items: Dictionary<CartItemEntity>) =>
          this.cartService.updateCartItem(action.itemId, items[action.itemId].quantity).pipe(map(() =>
            CartActions.decreaseQtySuccess()
          )),
        onError: (action, error) => CartActions.decreaseQtyFailure()
      })
    )
  );

  constructor(private actions$: Actions,
              private store: Store,
              private cartService: CartService) {}
}
