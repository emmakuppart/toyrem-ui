import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Product, ProductImage, ProductsFilter } from './products.models';
import { Page, ToyremFilter } from '../api.models';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private apiService: ApiService) {}

  public getProducts(filter: ProductsFilter): Observable<Page<Product>> {
    return this.apiService.get<Page<Product>>('/product/', {
      params: ToyremFilter.toHttpParams(filter)
    });
  }

  public getProduct(productId: number): Observable<Product> {
    return this.apiService.get<Product>(`/product/${productId}`, {});
  }

  public getProductImages(productId: number): Observable<ProductImage[]> {
    return this.apiService.get<ProductImage[]>(`/productimage/?productId=${productId}`, {});
  }
}