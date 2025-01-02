import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-side',
  imports: [],
  templateUrl: './auth-side.component.html',
  styleUrl: './auth-side.component.css'
})
export class AuthSideComponent {
  @Input() backgroundImage : string = '';
}
