import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { LocalStorageService } from './utility/services/local-storage.service';
import { StaticClass } from './utility/helper/static-words';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'pet-shop';

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.startAutoLogout();
  }

  startAutoLogout() {
    const expiryTime = this.localStorageService.getItem(StaticClass.expiryTime);
    if (!expiryTime) return;
    const remainingTime = +expiryTime - new Date().getTime();
    if (remainingTime > 0) {
      setTimeout(() => {
        this.localStorageService.clear();
        this.router.navigate([StaticClass.mainPage])
      }, remainingTime)
    }
    else {
      this.localStorageService.clear();
      this.router.navigate([StaticClass.mainPage])
    }
  }
}
