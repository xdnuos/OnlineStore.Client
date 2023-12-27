import { Component, Input } from '@angular/core';
import { orderDetails } from '../../../store/model/Order.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './orderItem.component.html',
  styleUrls: ['./orderItem.component.css'],
})
export class OrderItemComponent {
  @Input('orderItem') item: orderDetails | undefined;
  constructor() {}
}
