import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-side',
  imports: [],
  templateUrl: './auth-side.component.html',
  styleUrl: './auth-side.component.css'
})
export class AuthSideComponent {
  @Input() backgroundImage : string = '';
  
  title = 'Pet Shop';
  subTitle = 'Discover love, loyalty, and happiness with your new best friend today';
  author = 'Designed by: Sahil Khimani'; 
}
