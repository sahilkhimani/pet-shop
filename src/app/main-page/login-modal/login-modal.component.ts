import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  imports: [RouterLink, CommonModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  @Output() dialogClose: EventEmitter<void> = new EventEmitter();
  closeDialog() {
    this.dialogClose.emit();
  }

  isSmallScreen: boolean = window.innerWidth <= 600;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = event.target.innerWidth <= 600;
  }
}
