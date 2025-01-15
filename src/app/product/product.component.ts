import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PetModel } from '../models/pet.model';
import { ShortenTextPipe } from '../utility/pipes/shorten-text.pipe';
import { LocalStorageService } from '../utility/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../services/pet.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-product',
  imports: [ShortenTextPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() petItem?: PetModel;
  @Output() openLoginModal: EventEmitter<void> = new EventEmitter();
  @Output() productDetailModal : EventEmitter<void> = new EventEmitter();
  constructor(
    private router: Router,
    private petService: PetService
  ) { }
  buyNowClicked(product: PetModel) {
    const token = localStorage.getItem(AppComponent.token);
    if (token != null && token != "") {
      this.petService.setProductDetail(product);
      this.productDetailModal.emit();
    }
    else {
      this.openLoginModal.emit();
    }
  }
}
