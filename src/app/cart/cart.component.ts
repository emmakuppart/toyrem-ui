import { Component, OnInit } from '@angular/core';
import { CartFacade } from '../+state/cart/cart.facade';
import { NamedEntity } from '../shared/model/shared.model';
import { CartItemEntity } from '../+state/cart/cart.models';

@Component({
  selector: 'toyrem-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  readonly cart$ = this.facade.cart$;
  readonly cartItems$ = this.facade.cartItems$;
  readonly getName = NamedEntity.getName;

  constructor(private facade: CartFacade) { }

  ngOnInit(): void {
    this.facade.loadCart();
  }

  decreaseQty(item: CartItemEntity): void {
    this.facade.decreaseQty(item.id);
  }

  increaseQty(item: CartItemEntity): void {
    this.facade.increaseQty(item.id);
  }
}
