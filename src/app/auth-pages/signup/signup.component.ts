import { Component } from '@angular/core';
import { AuthSideComponent } from '../auth-side/auth-side.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RegisterModel } from '../../models/register.model';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../utility/services/snackbar.service';
import { StaticClass } from '../../utility/helper/static-words';
@Component({
  selector: 'app-signup',
  imports: [
    AuthSideComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  backgroundImage = 'assets/images/registerside.jpg'
  isLoading: boolean = false;
  email = 'email';
  password = 'password';
  cPassword = 'cPassword';

  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  singupForm = new FormGroup({
    name: new FormControl('',
      [Validators.required]
    ),
    email: new FormControl('',
      [Validators.required,
      Validators.email,
      Validators.pattern(this.emailPattern)]),
    password: new FormControl('',
      [Validators.required,
      Validators.minLength(8)]),
    cPassword: new FormControl('',
      [
        Validators.required,
      ]
    ),
    phoneNo: new FormControl('', Validators.required),
    roleId: new FormControl('', Validators.required)
  },
    { validators: this.passwordMatchValidator })


  submitForm() {
    const formData = this.singupForm.value;
    const data = new RegisterModel(formData.name, formData.email, formData.password, formData.cPassword, formData.phoneNo, formData.roleId);
    this.userService.register(data).subscribe({
      next: (response) => {
        this.router.navigate([StaticClass.loginPage]);
        this.snackbarService.open({ message: response, panelClass: [StaticClass.sucSnackbar] });
        this.singupForm.reset();
      },
      error: (err) => {
        this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
      }
    })
    this.isLoading = false;
  }


  get f() {
    return this.singupForm.controls;
  }

  getErrorMessages(controlName: string) {
    const requiredError = "This field is required";
    const validEmailError = "Enter Valid Email Address (e.g. user@example.com)";
    const passwordError = "Pasword must contain atleast 8 character with one uppercase letter and one special character";
    const required = 'required';
    const pattern = 'pattern';
    const control = this.singupForm.get(controlName);

    if (control?.hasError(required)) {
      return requiredError;
    }
    if (controlName == this.email && control?.hasError(pattern)) {
      return validEmailError;
    }
    if (controlName == this.password && control?.hasError(pattern)) {
      return passwordError;
    }
    return '';
  }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get(this.password)?.value;
    const confirmPassword = formGroup.get(this.cPassword)?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}