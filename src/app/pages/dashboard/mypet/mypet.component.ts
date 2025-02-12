import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
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
import { LocalStorageService } from '../../../utility/services/local-storage.service';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';

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
  deletePetId?: number;
  modalInstance: Modal | null = null;
  deletePetClicked : boolean = false;

  constructor(
    private snackbarService: SnackbarService,
    private petService: PetService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.fetchPets();
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 5,
      lengthChange: false
    }
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }
  }

  openDeleteModal(id: number) {
    this.deletePetId = id;
    this.modalInstance?.show()
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

  updatePet(pet: SimplePetModel) {
    this.petService.setEditMode(true);
    this.localStorageService.setItem(StaticClass.petDetails, pet)
    this.router.navigate([`/${StaticClass.dashboardPage}/${StaticClass.AddPetPage}`])
  }

  deletePet() {
    this.deletePetClicked = true
    this.petService.deletePet(this.deletePetId!).subscribe({
      next: (res) => {
        this.modalInstance?.hide()
        this.snackbarService.open({ message: res, panelClass: [StaticClass.sucSnackbar] })
        setTimeout(() => {
          window.location.reload();
        }, 1500)
      },
      error: (err) => {
        this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
        this.modalInstance?.hide()
        this.deletePetClicked = false;
      }
    })
  }
}
