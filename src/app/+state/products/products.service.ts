import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { ProductImage, ProductsEntity, ProductsFilter } from './products.models';
import { Page, ToyremFilter } from '../api.models';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private apiService: ApiService) {}

  public getProducts(filter: ProductsFilter): Observable<Page<ProductsEntity>> {
    return this.apiService.get<Page<ProductsEntity>>('/product/', {
      params: ToyremFilter.toHttpParams(filter)
    });
  }

  public getProductImages(productId: number): Observable<ProductImage[]> {
    return this.apiService.get<ProductImage[]>(`/productimage/?productId=${productId}`, {});
  }
}