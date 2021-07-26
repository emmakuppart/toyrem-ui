import { Component, OnInit } from '@angular/core';
import { ProductsFacade } from '../+state/products/products.facade';
import { Product, ProductsFilter } from '../+state/products/products.models';
import { TranslateService } from '@ngx-translate/core';
import { InputType, NamedEntity } from '../shared/model/shared.model';
import { CartFacade } from '../+state/cart/cart.facade';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'toyrem-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  readonly getName = NamedEntity.getName;
  readonly inputType = InputType;

  filter$ = this.productsFacade.filter$;
  products$ = this.productsFacade.products$;
  count$ = this.productsFacade.count$;
  displayFilter$ = this.productsFacade.displayFilter$;
  qtyPerProduct$ = this.cartFacade.qtyPerProduct$;

  quantity: number;
  form: FormGroup;

  constructor(private productsFacade: ProductsFacade,
              private translateService: TranslateService,
              private cartFacade: CartFacade,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  increaseQty(product: Product): void {

  }

  decreaseQty(product: Product): void {

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
