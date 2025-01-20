import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { SnackbarService } from '../../utility/services/snackbar.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from "../../product/product.component";
import { CategoryComponent } from "../../category/category.component";
import { PetModel } from '../../models/pet.model';
import { LoaderComponent } from "../../utility/loader/loader.component";
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { HeaderComponent } from '../../components/header/header.component';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';
import { SliderComponent } from "../../components/slider/slider.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-main-page',
  imports: [
    CommonModule,
    HeaderComponent,
    ProductComponent,
    CategoryComponent,
    LoaderComponent,
    LoginModalComponent,
    SliderComponent,
    FooterComponent
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  petsList: PetModel[] = [];
  isLoading: boolean = false;
  isModalVisible: boolean = false;
  productDetails?: PetModel;
  productDetailClicked: boolean = false;
  
  constructor(
    private petService: PetService,
    private snackbarService: SnackbarService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.petService.getAll()
      .subscribe({
        next: (response) => {
          this.petsList = response;
          this.isLoading = false;
        },
        error: (err) => {
          this.snackbarService.open({ message: err.error, panelClass: ['error-snackbar'] });
          this.isLoading = false;
        }
      })
  }

  setupDialog(dialogName: any) {
    dialogName.showModal();

    this.renderer.listen(dialogName, 'click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target.nodeName === "DIALOG") {
        this.dialogClose(dialogName)
      }
    });
  }
  dialogClose(dialogName: any) {
    dialogName.close();
    this.productDetailClicked = false;
  }
  openLoginModal() {
    const dialog = this.elRef.nativeElement.querySelector("#loginDialogue");
    this.setupDialog(dialog);
  }
  closeLoginDialog() {
    const dialog = this.elRef.nativeElement.querySelector("#loginDialogue");
    this.dialogClose(dialog);
  }
}
