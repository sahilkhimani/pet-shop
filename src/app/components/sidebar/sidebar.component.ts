import { Component, OnInit } from '@angular/core';
import { StaticClass } from '../../utility/helper/static-words';
import { LocalStorageService } from '../../utility/services/local-storage.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  role?: string | null;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.role = this.localStorageService.getItem(StaticClass.role);
  }
  static navLinks: { name: string, link: string, role?: string[] | null }[] = [
    { name: 'Home', link: StaticClass.mainPage, role: [StaticClass.buyerRole, StaticClass.adminRole] },
    { name: 'Edit Profile', link: 'profile' },
    { name: 'My Orders', link: 'my-orders', role: [StaticClass.buyerRole, StaticClass.adminRole] },
    { name: 'My Pets', link: '', role: [StaticClass.sellerRole, StaticClass.adminRole] },
  ]

  dashboardNav = SidebarComponent.navLinks;

  GoToDashboard() {
    this.router.navigate([StaticClass.dashboardPage])
  }

  logout() {
    this.localStorageService.clear();
  }
}
