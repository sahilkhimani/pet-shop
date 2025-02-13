import { Component } from '@angular/core';
import { UserDetailsComponent } from "./user-details/user-details.component";

@Component({
  selector: 'app-profile-details',
  imports: [
    UserDetailsComponent
],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent {

}