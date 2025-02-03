import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetModel } from '../../models/pet.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CheckProductStatusService } from '../../utility/services/checkProductStatus.service';
import { LocalStorageService } from '../../utility/services/local-storage.service';
import { StaticClass } from '../../utility/helper/static-words';

@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  providers: [CheckProductStatusService]
})
export class ProductDetailComponent implements OnInit {
  productDetail: PetModel = {};
  noProduct: boolean = false;
  alreadyFavorite: boolean = false;

  constructor(
    private router: Router,
    private checkStatus: CheckProductStatusService,
    private localStorageService: LocalStorageService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { product: PetModel };
    this.productDetail = state?.product;
  }
  ngOnInit(): void {
    if (!this.productDetail) {
      this.noProduct = true;
    }
    let items = this.localStorageService.getItem<PetModel[]>(StaticClass.wishlist) || [];
    if (items.some(i => i.PetId === this.productDetail.PetId)) {
      this.alreadyFavorite = true;
    }
  }

  toggleWishItem(item: PetModel) {
    if (!this.alreadyFavorite) {
      this.addToWishlist(item);
    }
    else {
      this.removeFromWishlist(item);
    }
  }

  checkProductStatus(status: string) {
    return this.checkStatus.checkProductStatus(status);
  }

  addToWishlist(item: PetModel) {
    let items = this.localStorageService.getItem<PetModel[]>(StaticClass.wishlist) || [];
    if (items.some(i => i.PetId === item.PetId)) {
      this.alreadyFavorite = true;
    }
    else {
      this.localStorageService.addToList<PetModel>(StaticClass.wishlist, item);
      this.alreadyFavorite = true;
    }
  }

  removeFromWishlist(item: PetModel) {
    this.localStorageService.removeFromList<PetModel>(StaticClass.wishlist, (i => i.PetId === item.PetId))
    this.alreadyFavorite = false;
  }


}
