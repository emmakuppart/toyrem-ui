import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as OrderSelectors from "./order.selectors";
import * as OrderActions from './order.actions';
import { Order } from './order.models';

@Injectable()
export class OrderFacade {
  order$ = this.store.pipe(select(OrderSelectors.getOrder));

  constructor(private store: Store) {}

  saveOrder(order: Order): void {
    if (order.id) {
      this.store.dispatch(OrderActions.updateOrder({ order: order }));
    } else {
      this.store.dispatch(OrderActions.saveOrder({ order: order }));
    }
  }
}
