import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Language } from '../shared/model/shared.model';
import { CartFacade } from '../+state/cart/cart.facade';

@Component({
  selector: 'toyrem-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  readonly language = Language;

  @Input() count$ = this.cartFacade.count$;

  @Output() languageSelected = new EventEmitter<Language>();

  constructor(private cartFacade: CartFacade) {}
}
