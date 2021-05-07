import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsFacade } from '../+state/products/products.facade';

@Component({
  selector: 'toyrem-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  product$ = this.facade.selectedProduct$;

  constructor(private route: ActivatedRoute,
              private facade: ProductsFacade) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.facade.viewProductDetails(productId);
  }

}
