import { Injectable } from "@angular/core";

import { select, Store } from "@ngrx/store";

import * as CartSelectors from "./cart.selectors";
import * as CartActions from './cart.actions';
import { ProductsEntity } from '../products/products.models';
import { CartItemEntity } from './cart.models';

@Injectable()
export class CartFacade {
  cart$ = this.store.pipe(select(CartSelectors.getCart));
  count$ = this.store.pipe(select(CartSelectors.getItemsCount));
  qtyPerProduct$ = this.store.pipe(select(CartSelectors.getQtyPerProduct));

  constructor(private store: Store) {}

  addItem(product: ProductsEntity, quantity: number): void {
    this.store.dispatch(CartActions.loadCartOnAdd({
      product: product,
      quantity: quantity
    }));
  }

  removeItem(item: CartItemEntity): void {
    this.store.dispatch(CartActions.removeItem({ item: item }));
  }
}
