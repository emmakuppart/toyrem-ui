import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Language } from '../shared/model/shared.model';
import { CartFacade } from '../+state/cart/cart.facade';
import { CountdownConfig } from 'ngx-countdown/interfaces';

@Component({
  selector: 'toyrem-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  readonly language = Language;
  readonly count$ = this.cartFacade.count$;
  readonly countdownConfig$ = this.cartFacade.countdownConfig$;

  @Output() languageSelected = new EventEmitter<Language>();

  constructor(private cartFacade: CartFacade) {}

  ngOnInit(): void {
    this.cartFacade.loadCart();
  }

  deleteCart(): void {

  }
}
