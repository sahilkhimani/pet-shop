import { Component, OnInit } from '@angular/core';
import { UserDataModel } from '../../../models/userdata.model';
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from '../../../utility/services/local-storage.service';
import { StaticClass } from '../../../utility/helper/static-words';
import { SnackbarService } from '../../../utility/services/snackbar.service';
import { Router, RouterLink } from '@angular/router';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-user-details',
  imports: [
    RouterLink
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  private userId?: string;
  public userDetails?: UserDataModel;
  public editProfilePage: string = StaticClass.profilePage;
  modalInstance: Modal | null = null;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.userId = this.localStorageService.getItem(StaticClass.userId) as string;
    this.getUserDetail();
    const modalElement = document.getElementById('confirmModal') as HTMLElement;
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }
  }

  getUserDetail() {
    this.userService.getById(this.userId!).subscribe(
      {
        next: (res) => {
          this.userDetails = res;
          this.localStorageService.setItem(StaticClass.userDetails, res);
        },
        error: (err) => {
          this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
        }
      }
    )
  }

  confirmationDialog() {
    this.modalInstance?.show()
  }

  deleteAccount() {
    this.userService.deleteUser(this.userId!).subscribe({
      next: (res) => {
        this.localStorageService.clear();
        this.router.navigate([StaticClass.loginPage]);
        this.snackbarService.open({ message: res, panelClass: [StaticClass.sucSnackbar] }
        )
      },
      error: (err) => {
        this.modalInstance?.hide();
        this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
      }
    })
  }
}