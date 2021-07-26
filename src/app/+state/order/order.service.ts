import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Order } from './order.models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private apiService: ApiService) {}

  public addOrder(order: Order): Observable<Order> {
    return this.apiService.post<Order>('/order/', order);
  }

  public updateOrder(order: Order): Observable<Order> {
    return this.apiService.put<Order>(`/order/${order.id}/`, order);
  }
}