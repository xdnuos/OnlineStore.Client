import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { Order } from '../../store/model/Order.model';
import {
  loadOrderCancelPagination,
  loadOrderPagination,
} from '../../store/orders/Order.action';
import * as sta from '../../store/orders/Order.selector';
@Component({
  selector: 'nz-demo-tabs-card',
  templateUrl: './orders.component.html',
})
export class OrdersPage implements OnInit {
  orders$: Observable<Order[]> = new Observable<Order[]>();
  cancelOrders$: Observable<Order[]> = new Observable<Order[]>();
  totalOrder: number = -1;
  totalCancelOrder: number = -1;
  constructor(private store: Store, private message: NzMessageService) {}
  ngOnInit(): void {
    this.orders$ = this.store.select(sta.selectOrders);
    this.cancelOrders$ = this.store.select(sta.selectCancelOrders);

    this.store.select(sta.selectTotal).subscribe((total) => {
      console.log('total', total);
      this.totalOrder = total;
    });
    this.store.select(sta.selectTotalCancel).subscribe((total) => {
      console.log('totalCancel', total);
      this.totalCancelOrder = total;
    });

    if (this.totalCancelOrder === -1) {
      console.log('loadOrderCancelPagination');
      this.store.dispatch(loadOrderCancelPagination({ page: 1, limit: 10 }));
    }

    if (this.totalOrder === -1) {
      console.log('loadOrderPagination');
      this.store.dispatch(loadOrderPagination({ page: 1, limit: 10 }));
    }
  }
}
