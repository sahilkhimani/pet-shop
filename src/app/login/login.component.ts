import { Component } from '@angular/core';
import { AuthSideComponent } from '../auth-side/auth-side.component';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginModel } from '../models/login.model';
import { UserService } from '../services/user.service';

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
  constructor(private userService: UserService, private router : Router) { }

  loginForm = new FormGroup({
    email: new FormControl('',
      [Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    password: new FormControl('', [Validators.required])
  })

  showPass() {
    this.showPassword = !this.showPassword;
  }

  submitForm() {
    this.isLoading = true;
    const formData = this.loginForm.value;
    const data = new LoginModel(formData.email, formData.password);
    this.userService.Login(data).subscribe({
      next: (response) => {
        this.router.navigate(['/main-page']);
        console.log(response)

      },
      error: (err) => {
        console.log(err.error)

      }
    })
    this.isLoading = false;
    this.loginForm.reset();
  }

  get f() {
    return this.loginForm.controls;
  }

  getErrorMessages(controlName: string) {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (controlName == 'email' && control?.hasError('pattern')) {
      return 'Enter valid Email Address (e.g. user@example.com)'
    }
    return '';
  }
}