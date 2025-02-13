import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUserModel } from '../../models/update-user.model';
import { UserDataModel } from '../../models/userdata.model';
import { UserService } from '../../services/user.service';
import { StaticClass } from '../../utility/helper/static-words';
import { LocalStorageService } from '../../utility/services/local-storage.service';
import { SnackbarService } from '../../utility/services/snackbar.service';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userDetails?: UserDataModel;
  editProfileForm?: FormGroup;
  curPassword: string = 'curPassword';
  newPassword = 'newPassword';
  cPassword = 'cPassword';
  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.userDetails = this.localStorageService.getItem(StaticClass.userDetails) as UserDataModel;

    this.editProfileForm = new FormGroup({
      userName: new FormControl(this.userDetails.userName, Validators.required),
      curPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('',
        [Validators.required, Validators.minLength(8)]
      ),
      cPassword: new FormControl('', Validators.required),
      phoneNo: new FormControl(this.userDetails.phoneNumber, Validators.required)
    },
      { validators: this.passwordMatchValidator }
    )
  }


  saveForm() {
    if (this.editProfileForm?.valid) {
      const userName = this.editProfileForm.value.userName;
      const curPassword = this.editProfileForm.value.curPassword;
      const newPassword = this.editProfileForm.value.newPassword;
      const cPassword = this.editProfileForm.value.cPassword;
      const phoneNo = this.editProfileForm.value.phoneNo;
      const newData = new UpdateUserModel(userName, curPassword, newPassword, cPassword, phoneNo);
      this.userService.updateUser(this.userDetails?.id!, newData).subscribe({
        next: (res) => {
          this.snackbarService.open({ message: res, panelClass: [StaticClass.sucSnackbar] })
          this.router.navigate([StaticClass.dashboardPage])
        },
        error: (err) => {
          this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar]})
        }
      })
    }
  }
  get f() {
    return this.editProfileForm!.controls;
  }

  getErrorMessages(controlName: string) {
    const requiredError = "This field is required";
    const passwordError = "Pasword must contain atleast 8 character with one uppercase letter and one special character";
    const required = 'required';
    const pattern = 'pattern';
    const control = this.editProfileForm!.get(controlName);

    if (control?.hasError(required)) {
      return requiredError;
    }
    if (controlName == this.newPassword && control?.hasError(pattern)) {
      return passwordError;
    }
    return '';
  }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('cPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}
