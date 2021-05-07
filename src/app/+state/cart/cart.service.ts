import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { AddCartItemParams, CartEntity, CartItemEntity } from './cart.models';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private apiService: ApiService) {}

  public addCart(): Observable<CartEntity> {
    return this.apiService.post<CartEntity>('/cart/', {
      expires: new Date()
    });
  }

  public addCartItem(params: AddCartItemParams): Observable<CartItemEntity> {
    return this.apiService.post<CartItemEntity>('/cart-item/', params);
  }

  public deleteCartItem(itemId: number): Observable<CartItemEntity> {
    return this.apiService.delete<CartItemEntity>(`/cart-item/${itemId}/`);
  }

  public updateCartItem(itemId: number, quantity: number): Observable<CartItemEntity> {
    return this.apiService.put<CartItemEntity>(`/cart-item/${itemId}/`, {
      'quantity': quantity
    });
  }
}