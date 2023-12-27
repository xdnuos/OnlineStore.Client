import { Component, Input } from '@angular/core';
import { Order } from '../../../store/model/Order.model';

@Component({
  selector: 'app-order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  @Input('order') order: Order | undefined;
  constructor() {}
}
