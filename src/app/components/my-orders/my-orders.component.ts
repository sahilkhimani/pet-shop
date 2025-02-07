import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GetOrdersModel } from '../../models/get-orders.model';
import { OrderService } from '../../services/order.service';
import { SnackbarService } from '../../utility/services/snackbar.service';
import { StaticClass } from '../../utility/helper/static-words';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables'
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-my-orders',
  imports: [
    CommonModule,
    DataTablesModule
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit, AfterViewInit {
  ordersData: GetOrdersModel[] = [];
  dtOptions : Config ={}
  dttrigger:Subject<any> = new Subject<any>();
  constructor(
    private orderService: OrderService,
    private snackbarService: SnackbarService
  ) { }
  ngOnInit(): void {
    this.fetchOrdersData();
    this.dttrigger.next(null);
  }

  ngAfterViewInit(): void {

  }

  fetchOrdersData() {
    this.orderService.getBuyerOrders().subscribe({
      next: (res) => {
        this.ordersData = res
      },
      error: (err) => {
        this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
      }
    })
  }
}
