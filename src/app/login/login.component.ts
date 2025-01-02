import { Component } from '@angular/core';
import { AuthSideComponent } from '../auth-side/auth-side.component';
import { RouteConfigLoadEnd, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  loginForm = new FormGroup({
    email : new FormControl('',
     [Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    password : new FormControl('',
      [Validators.required, 
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Z]).{8,}$')]) 
  })
  
    showPass(){
      this.showPassword = !this.showPassword;
    }

  submitForm(){
    
  }

  get f(){
    return this.loginForm.controls;
  }

  getErrorMessages(controlName : string){
    const control = this.loginForm.get(controlName);
    if(control?.hasError('required')){
      return 'This field is required';
    }
    if(controlName == 'email' && control?.hasError('pattern')){
      return 'Enter valid Email Address (e.g. user@example.com)'
    }
    if(controlName == 'password' && control?.hasError('pattern')){
      return 'Pasword must contain atleast 8 character with one uppercase letter'
    }
    return '';
  }
}