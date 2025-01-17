import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  headerNav: { name: string, link: string }[] =
    [
      { name: 'Login', link: '/login' },
      { name: 'Cats', link: '' },
      { name: 'Dogs', link: '' },
      { name: 'Other Pets', link: '' },
      { name: 'About Us', link: '' },
    ]
  public token?: string | null;
  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private router: Router,
  ) { }

  ngOnInit() {
    this.setupDialog();
    this.token = localStorage.getItem(AppComponent.token);
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
}
