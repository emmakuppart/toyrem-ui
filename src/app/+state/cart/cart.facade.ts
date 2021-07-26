import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as CartSelectors from "./cart.selectors";
import * as CartActions from './cart.actions';

@Injectable()
export class CartFacade {
  cart$ = this.store.pipe(select(CartSelectors.getCart));
  cartItems$ = this.store.pipe(select(CartSelectors.getAllCartItems));
  count$ = this.store.pipe(select(CartSelectors.getItemsCount));
  qtyPerProduct$ = this.store.pipe(select(CartSelectors.getQtyPerProduct));
  countdownConfig$ = this.store.pipe(select(CartSelectors.getCountdownConfig));

  constructor(private store: Store) {}

  loadCart(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  addItem(productId: number, quantity: number): void {
    this.store.dispatch(CartActions.loadCartOnAdd({
      productId: productId,
      quantity: quantity
    }));
  }

  /*removeItem(item: CartItemEntity): void {
    this.store.dispatch(CartActions.removeItem({ item: item }));
  }*/

  decreaseQty(itemId: number): void {
    this.store.dispatch(CartActions.decreaseQty({ itemId: itemId }));
  }

  increaseQty(itemId: number): void {
    this.store.dispatch(CartActions.increaseQty({ itemId: itemId }));
  }
}
