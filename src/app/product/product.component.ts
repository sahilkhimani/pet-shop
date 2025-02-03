import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PetModel } from '../models/pet.model';
import { ShortenTextPipe } from '../utility/pipes/shorten-text.pipe';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { CheckProductStatusService } from '../utility/services/checkProductStatus.service';
import { StaticClass } from '../utility/helper/static-words';

@Component({
  selector: 'app-product',
  imports: [
    ShortenTextPipe,
    CommonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers : [CheckProductStatusService]
})
export class ProductComponent {
  @Input() petItem?: PetModel;
  @Output() openLoginModal = new EventEmitter();
  constructor(
    private router: Router,
    private checkStatus : CheckProductStatusService
  ) { }
  buyNowClicked(product: PetModel) {
    const token = localStorage.getItem(StaticClass.token);
    if (token != null && token != '') {
      this.router.navigate(['product-details'], {state : {product}});
    }
    else {
      this.openLoginModal.emit();
    }
  }

  checkProductStatus(status: string): boolean {
   return this.checkStatus.checkProductStatus(status);
  }
}
