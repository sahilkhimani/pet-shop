import { Component } from '@angular/core';
import { AuthSideComponent } from '../auth-side/auth-side.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RegisterModel } from '../models/register.model';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../utility/services/snackbar.service';
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
  localStorage: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService : SnackbarService
  ) { }

  singupForm = new FormGroup({
    name: new FormControl('',
      [Validators.required]
    ),
    email: new FormControl('',
      [Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
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
        this.router.navigate(['/login']);
        this.snackbarService.open({message : response, panelClass : ['suc-snackbar']});
        this.singupForm.reset();
      },
      error: (err) => {
        this.snackbarService.open({message : err.error, panelClass : ['error-snackbar']})
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
    const control = this.singupForm.get(controlName);

    if (control?.hasError('required')) {
      return requiredError;
    }
    if (controlName == 'email' && control?.hasError('pattern')) {
      return validEmailError;
    }
    if (controlName == 'password' && control?.hasError('pattern')) {
      return passwordError;
    }
    return '';
  }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('cPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}