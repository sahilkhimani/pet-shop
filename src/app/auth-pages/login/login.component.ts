import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginModel } from '../../models/login.model';
import { UserService } from '../../services/user.service';
import { StaticClass } from '../../utility/helper/static-words';
import { DecodeTokenService } from '../../utility/services/decode-token.service';
import { LocalStorageService } from '../../utility/services/local-storage.service';
import { SnackbarService } from '../../utility/services/snackbar.service';
import { AuthSideComponent } from '../auth-side/auth-side.component';

@Component({
  selector: 'app-login',
  imports: [
    AuthSideComponent,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  backgroundImage = 'assets/images/loginside.jpg'
  showPassword = false;
  isLoading: boolean = false;
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private jwtToken: DecodeTokenService,
    private localStorageService: LocalStorageService
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('',
      [Validators.required,
      Validators.email,
      Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required])
  })

  showPass() {
    this.showPassword = !this.showPassword;
  }

  submitForm() {
    const loginMessage = "Login Successfull";
    this.isLoading = true;
    const formData = this.loginForm.value;
    const data = new LoginModel(formData.email, formData.password);
    this.userService.Login(data).subscribe({
      next: (response) => {
        this.localStorageService.setItem<string>(StaticClass.token, response)
        const expiryTime = new Date().getTime() + 60 * 60 * 1000;
        this.localStorageService.setItem(StaticClass.expiryTime, expiryTime.toString());
        const decodeToken = this.jwtToken.decodeJwtToken(response);
        if (decodeToken) {
          this.localStorageService.setItem<string>(StaticClass.role, decodeToken.role);
          this.localStorageService.setItem<string>(StaticClass.userId, decodeToken.userId);
        }
        const role = this.localStorageService.getItem<string>(StaticClass.role);
        if (role == StaticClass.buyerRole) {
          this.router.navigate([StaticClass.mainPage]);
        }
        if (role == StaticClass.sellerRole || role == StaticClass.adminRole) {
          this.router.navigate([StaticClass.dashboardPage])
        }
        this.snackbarService.open({ message: loginMessage, panelClass: [StaticClass.sucSnackbar] })
      },
      error: (err) => {
        this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
      }
    })
    this.isLoading = false;
    this.loginForm.reset();
  }

  get f() {
    return this.loginForm.controls;
  }

  getErrorMessages(controlName: string) {
    const requiredError = "This field is required";
    const validEmailError = "Enter valid Email Address (e.g. user@example.com)";
    const required = 'required';
    const pattern = 'pattern';
    const control = this.loginForm.get(controlName);
    if (control?.hasError(required)) {
      return requiredError;
    }
    if (controlName == 'email' && control?.hasError(pattern)) {
      return validEmailError;
    }
    return '';
  }
}