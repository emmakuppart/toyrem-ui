import { Component, OnInit } from '@angular/core';
import { CartFacade } from '../+state/cart/cart.facade';

@Component({
  selector: 'toyrem-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  readonly cart$ = this.facade.cart$;
  readonly cartItems$ = this.facade.cartItems$;

  constructor(private facade: CartFacade) { }

  ngOnInit(): void {
    this.facade.loadCart();
  }
}
