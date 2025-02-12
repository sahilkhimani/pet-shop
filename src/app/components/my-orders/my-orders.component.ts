import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetOrdersModel } from '../../models/get-orders.model';
import { OrderService } from '../../services/order.service';
import { SnackbarService } from '../../utility/services/snackbar.service';
import { StaticClass } from '../../utility/helper/static-words';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables'
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { UpdateOrderStatusModel } from '../../models/update-order-status.model';
import { PetModel } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-my-orders',
  imports: [
    CommonModule,
    DataTablesModule
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {
  ordersData: GetOrdersModel[] = [];
  dtOptions: Config = {}
  dttrigger: Subject<any> = new Subject<any>();
  clicked: boolean = false;
  petItem?: PetModel[];
  deletePetId?: number;
  modalInstance: Modal | null = null;

  pendingStatus: string = 'pending'
  processingStatus: string = 'processing'
  shippedStatus: string = 'shipped'
  failedStatus: string = 'failed'
  deliveredStatus: string = 'delivered'
  cancelledStatus: string = 'cancelled'

  constructor(
    private orderService: OrderService,
    private snackbarService: SnackbarService,
    private petService: PetService,
    private router: Router
  ) { }
  ngOnInit(): void {
    const modalElement = document.getElementById('confirmCancelModal') as HTMLElement;
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }
    this.petService.getAll().subscribe({
      next: (res) => this.petItem = res,
    })
    this.fetchOrdersData();
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 5,
      lengthChange: false
    }
  }

  confirmationDialog(id: number) {
    this.deletePetId = id;
    this.modalInstance?.show()
  }

  fetchOrdersData() {
    this.orderService.getBuyerOrders().subscribe({
      next: (res) => {
        this.ordersData = res
        this.dttrigger.next(null);
      },
      error: (err) => {
        this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
      }
    })
  }

  getColor(status: string): string {
    if (status.toLowerCase() === this.cancelledStatus || status.toLocaleLowerCase() === this.failedStatus) {
      return 'red';
    }
    else if (status.toLocaleLowerCase() === this.deliveredStatus) {
      return 'green'
    }
    return 'yellow'
  }

  cancelOrder() {
    const cancelOrder = new UpdateOrderStatusModel(this.cancelledStatus);
    this.clicked = true;
    this.orderService.cancelOrder(this.deletePetId!, cancelOrder).subscribe({
      next: (res) => {
        this.snackbarService.open({ message: res, panelClass: [StaticClass.sucSnackbar] })
        setTimeout(() => {
          window.location.reload();
        }, 1000)
        this.modalInstance?.hide()
      },
      error: (err) => {
        this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
        this.clicked = false;
        this.modalInstance?.hide()
      }
    })
  }
  viewPetDetail(product: PetModel | null) {
    if (product === null) {
      console.log("error")
    }
    this.router.navigate(['product-details'], { state: { product } });
  }

  getPetItem(id: number): PetModel | null {
    const petItem = this.petItem?.find(pet => pet.PetId === id);
    if (petItem) return petItem;
    return null
  }
}
