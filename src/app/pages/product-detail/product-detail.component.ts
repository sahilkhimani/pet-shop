import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { CreateOrderModel } from '../../models/CreateOrder.model';
import { PetModel } from '../../models/pet.model';
import { OrderService } from '../../services/order.service';
import { StaticClass } from '../../utility/helper/static-words';
import { CheckProductStatusService } from '../../utility/services/checkProductStatus.service';
import { LocalStorageService } from '../../utility/services/local-storage.service';
import { SnackbarService } from '../../utility/services/snackbar.service';

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
  modalInstance: Modal | null = null;

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
    const modalElement = document.getElementById('confirmBuy') as HTMLElement;
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }
    if (!this.productDetail) {
      this.noProduct = true;
    }
    let items = this.localStorageService.getItem<PetModel[]>(StaticClass.wishlist) || [];
    if (items.some(i => i.PetId === this.productDetail.PetId)) {
      this.alreadyFavorite = true;
    }
  }

  confirmationDialog() {
    this.modalInstance?.show()
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
            this.snackbarService.open({ message: res, panelClass: [StaticClass.sucSnackbar] })
            this.modalInstance?.hide()
            this.router.navigate([StaticClass.mainPage])
          },
          error: (err) => {
            this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
            this.modalInstance?.hide()
          }
        })
      }
    }
    else {
      this.snackbarService.open({ message: "You can't buy pet. Please Sign Up as a buyer", panelClass: [StaticClass.errorSnackbar] })
    }
  }

}
