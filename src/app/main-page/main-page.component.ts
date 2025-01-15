import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PetService } from '../services/pet.service';
import { SnackbarService } from '../utility/services/snackbar.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ProductComponent } from "../product/product.component";
import { CategoryComponent } from "../category/category.component";
import { PetModel } from '../models/pet.model';
import { LoaderComponent } from "../utility/loader/loader.component";
import { LoginModalComponent } from "./login-modal/login-modal.component";

@Component({
  selector: 'app-main-page',
  imports: [
    CommonModule,
    HeaderComponent,
    ProductComponent,
    CategoryComponent,
    LoaderComponent,
    LoginModalComponent
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  petsList: PetModel[] = [];
  isLoading: boolean = false;
  isModalVisible: boolean = false;
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
          this.snackbarService.open({ message: err.error, panelClass: ['error-snackbar'] })
        }
      })
    this.isLoading = false;
  }
  openModal() {
    this.setupDialog();
  }
  closeDialog(){
    const dialog = this.elRef.nativeElement.querySelector("#loginDialogue")
    dialog.close();
  }
  setupDialog() {
    const dialog = this.elRef.nativeElement.querySelector("#loginDialogue")
    dialog.showModal();

    this.renderer.listen(dialog, 'click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target.nodeName === "DIALOG") {
        dialog.close();
      }
    });
  }
}
