import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  token:any = '';
  constructor(private localStorage : LocalStorageService){
    this.token = localStorage.getItem('authToken');
  }

  
}
