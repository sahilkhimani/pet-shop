import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { LocalStorageService } from './utility/services/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'pet-shop';
  constructor(private localStorageService : LocalStorageService){}
  ngOnInit(): void {
    this.localStorageService.clear();
  }
}
