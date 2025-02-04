import { Component, OnInit } from '@angular/core';
import { StaticClass } from '../../utility/helper/static-words';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LocalStorageService } from '../../utility/services/local-storage.service';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { MobileSidebarComponent } from "../../components/sidebar/mobile-sidebar/mobile-sidebar.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    SidebarComponent,
    MobileSidebarComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  role?: string | null;
  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.role = this.localStorageService.getItem(StaticClass.role);
  }

}
