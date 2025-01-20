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
  imports: [ShortenTextPipe, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() petItem?: PetModel;
  @Output() openLoginModal = new EventEmitter();
  productStatus: string[] = ['failed', 'cancelled'];
  constructor(
    private router: Router
  ) { }
  buyNowClicked(product: PetModel) {
    const token = localStorage.getItem(AppComponent.token);
    if (token != null && token != '') {
      this.router.navigate(['product-details', product.PetId]);
    }
    else {
      this.openLoginModal.emit();
    }
  }

  checkProductStatus(status: string): boolean {
    if (this.productStatus.includes(status.toLowerCase())) {
      return true;
    }
    return false;
  }
}
