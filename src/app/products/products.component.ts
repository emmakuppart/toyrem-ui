import { Component, Output, EventEmitter } from '@angular/core';
import { ProductsFacade } from '../+state/products/products.facade';
import { ProductsEntity } from '../+state/products/products.models';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../shared/model/shared.model';
import { AddCartItemParams } from '../+state/cart/cart.models';
import { CartFacade } from '../+state/cart/cart.facade';

@Component({
  selector: 'toyrem-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  products$ = this.productsFacade.products$;
  count$ = this.productsFacade.count$;
  qtyPerProduct$ = this.cartFacade.qtyPerProduct$;

  quantity: number;

  constructor(private productsFacade: ProductsFacade,
              private translateService: TranslateService,
              private cartFacade: CartFacade) {}

  getProductName(product: ProductsEntity): string {
    switch (this.translateService.currentLang) {
      case Language.estonian:
        return product.name_est;
      case Language.russian:
        return product.name_rus;
      case Language.english:
        return product.name_eng;
    }
  }

  increaseQty(product: ProductsEntity): void {

  }

  decreaseQty(product: ProductsEntity): void {

  }
}
