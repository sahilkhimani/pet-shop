import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { ResponseModel } from '../models/response.model';
import { SnackbarService } from '../utility/services/snackbar.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ProductComponent } from "../product/product.component";

@Component({
  selector: 'app-main-page',
  imports: [
    CommonModule,
    HeaderComponent,
    ProductComponent
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  petsList: ResponseModel = {
    "success": true,
    "message": "Pet has been successfully fetched.",
    "data": [{ "petId": 4, "petName": "Sonic", "petAge": 5, "petPrice": 25000, "petGender": "Male", "breedId": 8, "breed": null, "ownerId": "f6d04970-4f96-4cba-ae5e-07895cf635d4", "owner": null, "orders": null },
      { "petId": 4, "petName": "Sonic", "petAge": 5, "petPrice": 25000, "petGender": "Male", "breedId": 8, "breed": null, "ownerId": "f6d04970-4f96-4cba-ae5e-07895cf635d4", "owner": null, "orders": null },
      { "petId": 4, "petName": "Sonic", "petAge": 5, "petPrice": 25000, "petGender": "Male", "breedId": 8, "breed": null, "ownerId": "f6d04970-4f96-4cba-ae5e-07895cf635d4", "owner": null, "orders": null }
    ]
  };
  breedList: ResponseModel = {
    "success": true,
    "message": "Breed has been successfully fetched.",
    "data": [{ "breedId": 7, "breedName": "German Shepherd", "speciesId": 5, "species": null, "pets": null }]
  };
  constructor(
    private petService: PetService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.petService.getAllBreed().subscribe({
      next: (response) => {
        this.breedList = response;
      },
      error: (err) => {
        this.snackbarService.open({ message: err.error, panelClass: ['error-snackbar'] })
      }
    })
    this.petService.getAll().subscribe({
      next: (response) => {
        this.petsList = response;
      },
      error: (err) => {
        this.snackbarService.open({ message: err.error, panelClass: ['error-snackbar'] })
      }
    })
  }

}
