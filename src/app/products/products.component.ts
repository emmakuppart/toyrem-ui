import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ProductsFacade } from '../+state/products/products.facade';
import { ProductsEntity, ProductsFilter } from '../+state/products/products.models';
import { TranslateService } from '@ngx-translate/core';
import { InputType, Language } from '../shared/model/shared.model';
import { CartFacade } from '../+state/cart/cart.facade';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'toyrem-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  filter$ = this.productsFacade.filter$;
  products$ = this.productsFacade.products$;
  count$ = this.productsFacade.count$;
  displayFilter$ = this.productsFacade.displayFilter$;
  qtyPerProduct$ = this.cartFacade.qtyPerProduct$;
  inputType = InputType;

  quantity: number;
  form: FormGroup;

  constructor(private productsFacade: ProductsFacade,
              private translateService: TranslateService,
              private cartFacade: CartFacade,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

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

  toggleFilter(): void {
    this.productsFacade.toggleFilter();
  }

  search(): void {
    const filter = new ProductsFilter();
    filter.name = this.form.controls['name']?.value;
    filter.code = this.form.controls['code']?.value;
    filter.lang = this.translateService.currentLang;
    this.productsFacade.search(filter);
  }

  reset(): void {
    this.createForm();
    this.search();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      code: [],
      name: [],
    });
  }
}
