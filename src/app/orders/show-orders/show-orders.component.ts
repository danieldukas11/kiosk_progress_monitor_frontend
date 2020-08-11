import {Component, OnInit} from '@angular/core';
import {WebSocketService} from '../../core/services/websocket.service';
import {OrdersService} from '../../core/services/orders.service';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit {

  orders: any[] = [];
  cookingOrders = [];
  readyOrders = [];

  constructor(
    private webSocketService: WebSocketService,
    private ordersService: OrdersService
  ) {
    this.getOrdersByHttp();
  }

  ngOnInit(): void {
    this.webSocketService.on('get_order').subscribe((order: any) => {
      this.orders.push(order);
    });
    this.webSocketService.on('cooking_order').subscribe((order: any) => {
      // console.log('cooking order')
      // const found = this.orders.find(ord => ord._id === order._id);
      // found.status = order.status;
      // console.log(found);
      this.getOrdersByHttp();
    });
    this.getOrdersByHttp();
  }

  getRows(orders) {
    return new Array(Math.round(Object.keys(orders).length / 3));
  }

  splitOrders(orders, row) {
    return orders.slice(row * 3, 3 * (row + 1));
  }

  getIndex(order) {
    return this.orders.indexOf(order) + 1;
  }

  getOrdersByHttp() {
    this.ordersService.get().subscribe((dt: any[]) => {
      this.orders = dt;
      this.cookingOrders = dt.filter(d => d.status === 'cooking');
      this.readyOrders = dt.filter(d => d.status === 'ready');
      console.log(this.cookingOrders);
      console.log(this.readyOrders);
    });
  }


}
