import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../../../utility/services/snackbar.service';
import { StaticClass } from '../../../utility/helper/static-words';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpeciesModel } from '../../../models/species.model';
import { SpeciesService } from '../../../services/species.service';
import { Modal } from 'bootstrap';
import { CreateSpeciesModel } from '../../../models/create-species.model';

@Component({
  selector: 'app-species',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css'
})
export class SpeciesComponent implements OnInit {
  speciesList: SpeciesModel[] = []
  speciesItem?: SpeciesModel;
  addSpeciesForm?: FormGroup;
  private modalInstance?: Modal;
  editMode = false;

  speciesName: string = 'speciesName';

  constructor(
    private speciesService: SpeciesService,
    private snackbarService: SnackbarService
  ) { }
  ngOnInit(): void {
    this.getSpeciesList()
    this.addSpeciesForm = new FormGroup({
      speciesName: new FormControl('', Validators.required),
    })
    const modalElement = document.getElementById('newSpeciesModal');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement)
    }
  }

  openSpeciesModal() {
    this.addSpeciesForm?.get(this.speciesName)?.setValue('')
    this.editMode = false;
    this.modalInstance?.show()
  }

  saveSpecies() {
    const speciesName = this.addSpeciesForm?.value.speciesName;
    const data = new CreateSpeciesModel(speciesName);
    if (!this.editMode) {
      this.speciesService.createSpecies(data).subscribe({
        next: (response) => {
          this.snackbarService.open({ message: response, panelClass: [StaticClass.sucSnackbar] })
          this.getSpeciesList()
          this.modalInstance?.hide()
        },
        error: (err) => {
          this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
          this.modalInstance?.hide()
        }
      })
    }
    else {
      this.speciesService.updateSpecies(this.speciesItem?.SpeciesId!, data).subscribe({
        next: (response) => {
          this.snackbarService.open({ message: response, panelClass: [StaticClass.sucSnackbar] })
          this.getSpeciesList()
          this.modalInstance?.hide()
        },
        error: (err) => {
          this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
          this.modalInstance?.hide()
        }
      })
    }
  }

  deleteSpecies(item: SpeciesModel) {
    const deleteErrorMsg = 'Cannot delete species because it is used.'
    this.speciesService.deleteSpecies(item.SpeciesId!).subscribe({
      next: (response) => {
        this.snackbarService.open({ message: response, panelClass: [StaticClass.sucSnackbar] })
        this.getSpeciesList()
      },
      error: (err) => {
        this.snackbarService.open({ message: deleteErrorMsg, panelClass: [StaticClass.errorSnackbar] })
      }
    })
  }

  updateSpecies(speciesItem: SpeciesModel) {
    this.addSpeciesForm?.get(this.speciesName)?.setValue(speciesItem.SpeciesName)
    this.speciesItem = speciesItem;
    this.editMode = true;
    this.modalInstance?.show()
  }

  getSpeciesList() {
    this.speciesService.getAll().subscribe({
      next: (response) => this.speciesList = response,
      error: (err) => this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
    })
  }

  get b() {
    return this.addSpeciesForm!.controls;
  }

  getSpeciesError(controlName: string) {
    const requiredError = "This field is required";
    const required = 'required';
    const control = this.addSpeciesForm!.get(controlName);

    if (control?.hasError(required)) {
      return requiredError;
    }
    return '';
  }
}