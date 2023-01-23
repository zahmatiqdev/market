import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: any;

  constructor(private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.orders = this.onListOrders();
  }

  onListOrders() {
    this.orderService.getListOrderRequest()
        .subscribe(data => {
          console.log(data);
          this.orders = data;
    })
  }
}