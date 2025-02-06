import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { StaticClass } from '../../utility/helper/static-words';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { LocalStorageService } from '../../utility/services/local-storage.service';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { MobileSidebarComponent } from "../../components/sidebar/mobile-sidebar/mobile-sidebar.component";
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    MobileSidebarComponent,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  role?: string | null;
  public dashboardPage: string = StaticClass.dashboardPage;
  pageName?: string;
  private routeSub?: Subscription;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.role = this.localStorageService.getItem(StaticClass.role);
    this.setPage();
    this.routeSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setPage();
    })
  }

  setPage() {
    const url = this.router.url.split('/')[2];
    if (url) {
      this.pageName = url;
    }
    else {
      this.pageName = 'dashboard'
    }
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
