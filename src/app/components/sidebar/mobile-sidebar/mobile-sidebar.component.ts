import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../../utility/services/local-storage.service';
import { StaticClass } from '../../../utility/helper/static-words';
import { SidebarComponent } from '../sidebar.component';

@Component({
  selector: 'app-mobile-sidebar',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './mobile-sidebar.component.html',
  styleUrl: './mobile-sidebar.component.css'
})
export class MobileSidebarComponent implements OnInit {
  role?: string | null;
  constructor(
    private localStorageService: LocalStorageService
  ) { }
  ngOnInit(): void {
    this.role = this.localStorageService.getItem(StaticClass.role);
  }
  dashboardNav = SidebarComponent.navLinks;

  logout() {
    this.localStorageService.clear();
  }
}
