import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.setupDialog();
  }

  setupDialog() {
    const openButton = document.querySelector("#openMenu") as HTMLElement;
    const dialog = document.querySelector("dialog") as HTMLDialogElement;

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
}
