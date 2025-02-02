import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetModel } from '../../models/pet.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CheckProductStatusService } from '../../utility/services/checkProductStatus.service';
import { LocalStorageService } from '../../utility/services/local-storage.service';
import { StaticClass } from '../../utility/helper/static-words';
import { SnackbarService } from '../../utility/services/snackbar.service';
import { OrderService } from '../../services/order.service';
import { CreateOrderModel } from '../../models/CreateOrder.model';

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
    private localStorageService: LocalStorageService,
    private snackbarService: SnackbarService,
    private orderService: OrderService
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
  placeOrder(id: number) {
    const role = this.localStorageService.getItem(StaticClass.role);
    if (role === StaticClass.adminRole || role === StaticClass.buyerRole) {
      if (id != null) {
        const order = new CreateOrderModel(id);
        this.orderService.CreateOrder(order).subscribe({
          next: (res) => {
            this.snackbarService.open({ message: res, panelClass : [StaticClass.sucSnackbar] })
            this.router.navigate([StaticClass.mainPage])
          },
          error: (err) => {
            this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
          }
        })
      }
    }
    else {
      this.snackbarService.open({ message: "You can't buy pet. Please Sign Up as a buyer", panelClass: [StaticClass.errorSnackbar] })
    }
  }

}
