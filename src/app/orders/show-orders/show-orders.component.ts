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
  pendingOrders = [];
  cookingOrders = [];
  readyOrders = [];
  latestReadyOrder;

  constructor(
    private webSocketService: WebSocketService,
    private ordersService: OrdersService
  ) {
    this.getOrdersByHttp();
  }

  ngOnInit(): void {
    this.webSocketService.on('get_order').subscribe((order: any) => {
      this.getOrdersByHttp();
    });
    this.webSocketService.on('cooking_order').subscribe((order: any) => {
      this.getOrdersByHttp();
    });
    this.webSocketService.on('ready_order').subscribe((order: any) => {
      this.latestReadyOrder = order;

      this.getOrdersByHttp();
    });
    this.getOrdersByHttp();
  }

  getRows(orders) {
    console.log(Array(Math.round(Object.keys(orders).length / 3)));
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
      this.pendingOrders = dt.filter(d => d.status === 'pending');
      this.cookingOrders = dt.filter(d => d.status === 'cooking');
      this.readyOrders = dt.filter(d => d.status === 'ready');
      setTimeout(() => {
        this.latestReadyOrder = null;
      }, 5000);
      // console.log(this.pendingOrders);
      // console.log(this.cookingOrders);
      // console.log(this.readyOrders);
    });
  }


}
