import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsFacade } from '../+state/products/products.facade';
import { CartFacade } from '../+state/cart/cart.facade';
import { ProductsEntity } from '../+state/products/products.models';

@Component({
  selector: 'toyrem-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  readonly product$ = this.facade.selectedProduct$;

  selectedQuantity = 1;

  constructor(private route: ActivatedRoute,
              private facade: ProductsFacade,
              private cartFacade: CartFacade) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.facade.viewProductDetails(productId);
  }

  increaseSelectedQuantity(): void {
    this.selectedQuantity++;
  }

  decreaseSelectedQuantity(): void {
    this.selectedQuantity--;
  }

  addToCart(product: ProductsEntity): void {
    this.cartFacade.addItem(product, this.selectedQuantity);
  }
}
