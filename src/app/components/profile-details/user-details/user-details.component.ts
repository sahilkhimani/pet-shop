import { Component, OnInit } from '@angular/core';
import { UserDataModel } from '../../../models/userdata.model';
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from '../../../utility/services/local-storage.service';
import { StaticClass } from '../../../utility/helper/static-words';
import { SnackbarService } from '../../../utility/services/snackbar.service';
import { RouterLink } from '@angular/router';

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
  public editProfilePage: string = StaticClass.profilePage
  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private snackbarService: SnackbarService
  ) { }
  ngOnInit(): void {
    this.userId = this.localStorageService.getItem(StaticClass.userId) as string;
    this.getUserDetail();
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
}