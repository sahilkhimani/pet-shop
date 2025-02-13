import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Modal } from 'bootstrap';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { UserDataModel } from '../../../models/userdata.model';
import { UserService } from '../../../services/user.service';
import { StaticClass } from '../../../utility/helper/static-words';
import { SnackbarService } from '../../../utility/services/snackbar.service';

@Component({
  selector: 'app-allusers',
  imports: [
    CommonModule,
    DataTablesModule
  ],
  templateUrl: './allusers.component.html',
  styleUrl: './allusers.component.css'
})
export class AllusersComponent {
  userData: UserDataModel[] = [];
  dtOptions: Config = {}
  dttrigger: Subject<any> = new Subject<any>();
  deleteUserId?: string;
  modalInstance: Modal | null = null;
  deleteClicked = false;

  constructor(
    private snackbarService: SnackbarService,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.fetchUsers();
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 5,
      lengthChange: false
    }

    const modalElement = document.getElementById('deleteModal') as HTMLElement;
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }
  }

  openModal(id: string) {
    this.deleteUserId = id;
    this.modalInstance?.show()
  }

  fetchUsers() {
    this.userService.getAllUser().subscribe({
      next: (res) => {
        this.userData = res
        this.dttrigger.next(null);
      },
      error: (err) => {
        this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
      }
    })
  }


  deleteUser() {
    this.userService.deleteUser(this.deleteUserId!).subscribe({
      next: (res) => {
        this.deleteClicked = true;
        this.snackbarService.open({ message: res, panelClass: [StaticClass.sucSnackbar] })
        this.modalInstance?.hide()
        setTimeout(() => {
          window.location.reload();
        }, 1500)
      },
      error: (err) => {
        this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
        this.modalInstance?.hide()
        this.deleteClicked = false;
      }
    })
  }
}
