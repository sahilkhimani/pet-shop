import { Component, OnInit } from '@angular/core';
import { BreedService } from '../../../services/breed.service';
import { LocalStorageService } from '../../../utility/services/local-storage.service';
import { BreedModel } from '../../../models/breed.model';
import { SnackbarService } from '../../../utility/services/snackbar.service';
import { StaticClass } from '../../../utility/helper/static-words';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpeciesModel } from '../../../models/species.model';
import { SpeciesService } from '../../../services/species.service';
import { Modal } from 'bootstrap';
import { CreateBreedModel } from '../../../models/create-breed.model';

@Component({
  selector: 'app-breed',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './breed.component.html',
  styleUrl: './breed.component.css'
})
export class BreedComponent implements OnInit {
  breedList: BreedModel[] = []
  speciesList: SpeciesModel[] = []
  breedItem?: BreedModel;
  addBreedForm?: FormGroup;
  private modalInstance?: Modal;
  editMode = false;

  breedName: string = 'breedName';
  speciesId: string = 'speciesId';
  constructor(
    private breedService: BreedService,
    private speciesService: SpeciesService,
    private snackbarService: SnackbarService
  ) { }
  ngOnInit(): void {
    this.getBreedList()
    this.getSpeciesList()
    this.addBreedForm = new FormGroup({
      breedName: new FormControl('', Validators.required),
      speciesId: new FormControl('', Validators.required)
    })
    const modalElement = document.getElementById('newBreedModal');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement)
    }
  }

  openBreedModal() {
    this.addBreedForm?.get(this.breedName)?.setValue('')
    this.addBreedForm?.get(this.speciesId)?.setValue('')
    this.editMode = false;
    this.modalInstance?.show()
  }

  saveBreed() {
    const breedName = this.addBreedForm?.value.breedName;
    const speciesId = this.addBreedForm?.value.speciesId;
    const data = new CreateBreedModel(breedName, speciesId);
    if (!this.editMode) {
      this.breedService.createBreed(data).subscribe({
        next: (response) => {
          this.snackbarService.open({ message: response, panelClass: [StaticClass.sucSnackbar] })
          this.getBreedList()
          this.modalInstance?.hide()
        },
        error: (err) => {
          this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
          this.modalInstance?.hide()
        }
      })
    }
    else {
      this.breedService.updateBreed(this.breedItem?.BreedId!, data).subscribe({
        next: (response) => {
          this.snackbarService.open({ message: response, panelClass: [StaticClass.sucSnackbar] })
          this.getBreedList()
          this.modalInstance?.hide()
        },
        error: (err) => {
          this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
          this.modalInstance?.hide()
        }
      })
    }
  }

  deleteBreed(item: BreedModel) {
    const deleteErrorMsg = 'Cannot delete breed because it is used.'
    this.breedService.deleteBreed(item.BreedId!).subscribe({
      next: (response) => {
        this.snackbarService.open({ message: response, panelClass: [StaticClass.sucSnackbar] })
        this.getBreedList()
      },
      error: (err) => {
        this.snackbarService.open({ message: deleteErrorMsg, panelClass: [StaticClass.errorSnackbar] })
      }
    })
  }

  updateBreed(breedItem: BreedModel) {
    this.addBreedForm?.get(this.breedName)?.setValue(breedItem.BreedName)
    this.addBreedForm?.get(this.speciesId)?.setValue(breedItem.SpeciesId)
    this.breedItem = breedItem;
    this.editMode = true;
    this.modalInstance?.show()
  }

  getBreedList() {
    this.breedService.getAll().subscribe({
      next: (response) => this.breedList = response,
      error: (err) => this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
    })
  }

  getSpeciesList() {
    this.speciesService.getAll().subscribe({
      next: (response) => this.speciesList = response,
      error: (err) => this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
    })
  }

  get b() {
    return this.addBreedForm!.controls;
  }

  getBreedError(controlName: string) {
    const requiredError = "This field is required";
    const required = 'required';
    const control = this.addBreedForm!.get(controlName);

    if (control?.hasError(required)) {
      return requiredError;
    }
    return '';
  }
}
