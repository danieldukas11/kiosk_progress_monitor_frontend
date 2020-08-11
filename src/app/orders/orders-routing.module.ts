import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowOrdersComponent} from './show-orders/show-orders.component';


const routes: Routes = [
  {
    path: '',
    component: ShowOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
