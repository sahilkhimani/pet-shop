import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { DataTablesModule } from "angular-datatables";
import { GetOrdersModel } from "../../../models/get-orders.model";
import { Config } from "datatables.net";
import { Subject } from "rxjs";
import { PetModel } from "../../../models/pet.model";
import { OrderService } from "../../../services/order.service";
import { SnackbarService } from "../../../utility/services/snackbar.service";
import { PetService } from "../../../services/pet.service";
import { Router } from "@angular/router";
import { StaticClass } from "../../../utility/helper/static-words";
import { UpdateOrderStatusModel } from "../../../models/update-order-status.model";


@Component({
  selector: 'app-order-history',
  imports: [
    CommonModule,
    DataTablesModule
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  ordersData: GetOrdersModel[] = [];
  dtOptions: Config = {}
  dttrigger: Subject<any> = new Subject<any>();
  clicked: boolean = false;
  petItem?: PetModel[];

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

  fetchOrdersData() {
    this.orderService.getSellerOrders().subscribe({
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

  updateStatus(id: number, event: any) {
    const updateStatus = new UpdateOrderStatusModel(event.target.value);
    if (event.target.value != 'change') {
      this.clicked = true;
      this.orderService.updateOrderStatus(id, updateStatus).subscribe({
        next: (res) => {
          this.snackbarService.open({ message: res, panelClass: [StaticClass.sucSnackbar] })
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        },
        error: (err) => {
          this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
          this.clicked = false;
        }
      })
    }
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
