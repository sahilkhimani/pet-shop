import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppComponent } from '../../app.component';
import { CategoryService } from '../../utility/services/category.service';
import { StaticClass } from '../../utility/helper/static-words';
import { LocalStorageService } from '../../utility/services/local-storage.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  static headerNav: { name: string, categName: string }[] =
    [
      { name: 'Cats', categName: 'cats' },
      { name: 'Dogs', categName: 'dogs' },
      { name: 'Birds', categName: 'birds' },
      { name: 'Other Pets', categName: 'others' },
    ]

  myHeaderNav = HeaderComponent.headerNav;

  public token?: string | null;
  public role?: string | null;
  public buyerRole: string = StaticClass.buyerRole;
  public dashboardPage : string = StaticClass.dashboardPage;
  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private router: Router,
    private categService: CategoryService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.setupDialog();
    this.token = this.localStorageService.getItem(StaticClass.token);
    this.role = this.localStorageService.getItem(StaticClass.role);
  }

  setupDialog() {
    const openButton = this.elRef.nativeElement.querySelector("#openMenu");
    const dialog = this.elRef.nativeElement.querySelector("#menuDialog")

    if (openButton && dialog) {
      this.renderer.listen(openButton, 'click', () => {
        dialog.showModal();
      });

      this.renderer.listen(dialog, 'click', (event: Event) => {
        const target = event.target as HTMLElement;
        if (target && target.nodeName === "DIALOG") {
          dialog.close("dismiss");
        }
      });
    }
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  categClicked(categ: string) {
    this.categService.setSelectedCategory(categ);
    const dialog = this.elRef.nativeElement.querySelector("#menuDialog");
    dialog.close();
    this.router.navigate(['/main-page']);
  }
}
