import { Component, Input } from '@angular/core';
import { ProductsEntity } from '../../+state/products/products.models';

@Component({
  selector: 'toyrem-product-table',
  templateUrl: './product-table.component.html'
})
export class ProductTableComponent {
  @Input() products: ProductsEntity[][];
}
