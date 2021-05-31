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
            product: action.product,
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
          product: action.product.id,
          cart: action.cart.id,
          quantity: action.quantity
        }).pipe(map(item => CartActions.addItemSuccess({ item: item })))
      })
    )
  );

  removeItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeItem),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(CartSelectors.getAllCartItems))
          )
        )
      ),
      fetch({
        run: (action, items: CartItemEntity[]) =>
          this.cartService.deleteCartItem(action.item.id).pipe(map(item =>
            CartActions.removeItemSuccess({
              item: item,
              allItemsDeleted: items.filter(i => i.id !== item.id).length === 0
            })
          ))
      })
    )
  );

  updateItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateItem),
      fetch({
        run: (action, items: CartItemEntity[]) =>
          this.cartService.updateCartItem(action.itemId, action.quantity).pipe(map(item =>
            CartActions.updateItemSuccess({ item: item })
          ))
      })
    )
  );

  constructor(private actions$: Actions,
              private store: Store,
              private cartService: CartService) {}
}
