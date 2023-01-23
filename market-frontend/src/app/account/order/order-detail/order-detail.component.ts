import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orders: any;
  id: number;

  constructor(private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.orders = this.onGetOrderDetail(this.id);
        }
      );
  }

  onGetOrderDetail(id: number) {
    this.orderService.getRetrieveOrderRequest(id)
        .subscribe(data => {
          console.log(data);
          this.orders = data;
    })
  }

}
