import { Component } from '@angular/core';
import { AuthSideComponent } from '../auth-side/auth-side.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RegisterModel } from '../../models/register.model';
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
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Z]).{8,}$')]),
    cPassword: new FormControl('',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z]).{8,}$'),
      ]
    ),
    phoneNo: new FormControl('', Validators.required),
    roleId: new FormControl('', Validators.required)
  },
  { validators: this.passwordMatchValidator })


  submitForm() {
    const formData = this.singupForm.value;
    const data = new RegisterModel(formData.name, formData.email, formData.password, formData.cPassword, formData.phoneNo, formData.roleId);
    console.log(data);
  }


  get f() {
    return this.singupForm.controls;
  }

  getErrorMessages(controlName: string) {
    const control = this.singupForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (controlName == 'email' && control?.hasError('pattern')) {
      return 'Enter valid Email Address (e.g. user@example.com)'
    }
    if (controlName == 'password' && control?.hasError('pattern')) {
      return 'Pasword must contain atleast 8 character with one uppercase letter'
    }
    return '';
  }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('cPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}