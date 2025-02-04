import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../../utility/services/local-storage.service';
import { StaticClass } from '../../../utility/helper/static-words';

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
  dashboardNav: { name: string, link: string, role?: string[] | null }[] = [
    { name: 'Home', link: StaticClass.mainPage, role: [StaticClass.buyerRole, StaticClass.adminRole] },
    { name: 'Profile', link: 'profile' },
    { name: 'My Orders', link: 'profile', role: [StaticClass.buyerRole, StaticClass.adminRole] },
    { name: 'My Pets', link: '', role: [StaticClass.sellerRole, StaticClass.adminRole] },
  ]

  logout() {
    this.localStorageService.clear();
  }
}
