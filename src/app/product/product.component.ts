import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PetModel } from '../models/pet.model';
import { ShortenTextPipe } from '../utility/pipes/shorten-text.pipe';
import { LocalStorageService } from '../utility/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [ShortenTextPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() petItem?: PetModel;
  @Output() openLoginModal: EventEmitter<void> = new EventEmitter();
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router) { }
  buyNowClicked(id: number) {
    const token = this.localStorageService.getItem("authToken");
    if (token != null && token != "") {
      this.router.navigate(['/product_details', id])
    }
    else {
      this.openLoginModal.emit();
    }
  }
}
