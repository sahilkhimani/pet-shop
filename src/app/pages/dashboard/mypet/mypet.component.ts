import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GetOrdersModel } from '../../../models/get-orders.model';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { OrderService } from '../../../services/order.service';
import { SnackbarService } from '../../../utility/services/snackbar.service';
import { StaticClass } from '../../../utility/helper/static-words';
import { UpdateOrderStatusModel } from '../../../models/update-order-status.model';
import { UserService } from '../../../services/user.service';
import { UserDataModel } from '../../../models/userdata.model';
import { PetModel } from '../../../models/pet.model';
import { PetService } from '../../../services/pet.service';
import { SimplePetModel } from '../../../models/simple-pet.model';

@Component({
  selector: 'app-mypet',
  imports: [
    CommonModule,
    DataTablesModule
  ],
  templateUrl: './mypet.component.html',
  styleUrl: './mypet.component.css'
})
export class MypetComponent {
  pets: SimplePetModel[] = [];
  dtOptions: Config = {}
  dttrigger: Subject<any> = new Subject<any>();

  constructor(
    private snackbarService: SnackbarService,
    private petService: PetService
  ) { }
  ngOnInit(): void {
    this.fetchPets();
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 5,
      lengthChange: false
    }
  }

  fetchPets() {
    this.petService.getYourPets().subscribe({
      next: (res) => {
        this.pets = res
        this.dttrigger.next(null);
      },
      error: (err) => {
        this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
      }
    })
  }

  // deleteUser(id: string) {
  //   this.userService.deleteUser(id).subscribe({
  //     next: (res) => {
  //       this.snackbarService.open({ message: res, panelClass: [StaticClass.sucSnackbar] })
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1000)
  //     },
  //     error: (err) => {
  //       this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
  //     }
  //   })
  // }
}
