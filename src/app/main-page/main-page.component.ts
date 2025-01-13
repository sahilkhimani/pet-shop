import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { SnackbarService } from '../utility/services/snackbar.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ProductComponent } from "../product/product.component";
import { CategoryComponent } from "../category/category.component";
import { PetModel } from '../models/pet.model';
import { LoaderComponent } from "../utility/loader/loader.component";

@Component({
  selector: 'app-main-page',
  imports: [
    CommonModule,
    HeaderComponent,
    ProductComponent,
    CategoryComponent,
    LoaderComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  petsList: PetModel[] = [];
  isLoading: boolean = false;
  constructor(
    private petService: PetService,
    private snackbarService: SnackbarService,
  ) { }
  ngOnInit(): void {
    this.isLoading = true;
    this.petService.getAll()
      .subscribe({
        next: (response) => {
            this.petsList = response;
        },
        error: (err) => {
          this.snackbarService.open({ message: err.error, panelClass: ['error-snackbar'] })
        }
      })
    this.isLoading = false;
  }

}
