import { Component } from '@angular/core';
import { AuthSideComponent } from '../auth-side/auth-side.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [AuthSideComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
