import { Component, OnInit } from '@angular/core';
import { UserDataModel } from '../../../../models/userdata.model';
import { LocalStorageService } from '../../../../utility/services/local-storage.service';
import { StaticClass } from '../../../../utility/helper/static-words';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { UpdateUserModel } from '../../../../models/update-user.model';
import { SnackbarService } from '../../../../utility/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePetModel } from '../../../../models/create-pet.model';
import { SimplePetModel } from '../../../../models/simple-pet.model';
import { PetService } from '../../../../services/pet.service';
import { BreedModel } from '../../../../models/breed.model';
import { SpeciesModel } from '../../../../models/species.model';
import { Modal } from 'bootstrap';
import { SpeciesService } from '../../../../services/species.service';
import { BreedService } from '../../../../services/breed.service';
import { CreateSpeciesModel } from '../../../../models/create-species.model';
import { CreateBreedModel } from '../../../../models/create-breed.model';
@Component({
  selector: 'app-addpet',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './addpet.component.html',
  styleUrl: './addpet.component.css'
})
export class AddpetComponent implements OnInit {
  petDetail?: SimplePetModel;
  addPetForm?: FormGroup;
  addBreedForm?: FormGroup;
  addSpeciesForm?: FormGroup;

  breedList?: BreedModel[];
  speciesList?: SpeciesModel[];
  genderList = ['Male', 'Female'];
  private breedModalInstance: Modal | null = null;
  private speciesModalInstance: Modal | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private snackbarService: SnackbarService,
    private petService: PetService,
    private speciesService: SpeciesService,
    private breedService: BreedService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    // this.petDetail = this.localStorageService.getItem(StaticClass.userDetails) as SimplePetModel;
    this.getBreedList();
    this.getSpeciesList();
    this.addPetForm = new FormGroup({
      petName: new FormControl(this.petDetail?.petName, Validators.required),
      petDesc: new FormControl(this.petDetail?.petDesc,
        [Validators.required, Validators.minLength(10)]),
      petAge: new FormControl(this.petDetail?.petAge, [Validators.required]),
      petPrice: new FormControl(this.petDetail?.petPrice, Validators.required),
      petGender: new FormControl(this.petDetail?.petGender || '', Validators.required),
      breedId: new FormControl(this.petDetail?.BreedId || '', Validators.required)
    })

    this.addBreedForm = new FormGroup({
      breedName: new FormControl('', Validators.required),
      speciesId: new FormControl('', Validators.required)
    })

    this.addSpeciesForm = new FormGroup({
      speciesName: new FormControl('', Validators.required)
    })

    const breedModalElement = document.getElementById('breedModal') as HTMLElement;
    const speciesModalElement = document.getElementById('speciesModal') as HTMLElement;
    if (breedModalElement) {
      this.breedModalInstance = new Modal(breedModalElement);
    }
    if (speciesModalElement) {
      this.speciesModalInstance = new Modal(speciesModalElement);
    }
  }

  getBreedList() {
    this.petService.getAllBreed().subscribe(response => this.breedList = response);
  }

  getSpeciesList() {
    this.petService.getAllSpecies().subscribe(response => this.speciesList = response);
  }

  addBreedModal(target: any) {
    if (target.value == 'addBreed') {
      this.breedModalInstance?.show()
    }
  }

  addSpeciesModal(target: any) {
    if (target.value == 'addSpecies') {
      this.speciesModalInstance?.show()
    }
  }

  saveSpecies() {
    const data = new CreateSpeciesModel(this.addSpeciesForm?.value.speciesName);
    this.speciesService.createSpecies(data).subscribe({
      next: (res) => {
        this.snackbarService.open({ message: res, panelClass: [StaticClass.sucSnackbar] })
        this.getSpeciesList()
        this.addBreedForm?.get('speciesId')?.setValue('');
        this.speciesModalInstance?.hide()
      },
      error: (err) => {
        this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
      }
    })
  }

  saveBreed() {
    const breedName = this.addBreedForm?.value.breedName;
    const speciesId = this.addBreedForm?.value.speciesId;
    const data = new CreateBreedModel(breedName, speciesId);
    this.breedService.createBreed(data).subscribe({
      next: (res) => {
        this.snackbarService.open({ message: res, panelClass: [StaticClass.sucSnackbar] })
        this.getBreedList()
        this.addPetForm?.get('breedId')?.setValue('');
        this.breedModalInstance?.hide()
      },
      error: (err) => {
        this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
      }
    })
  }

  saveForm() {
    if (this.addPetForm?.valid) {
      const name = this.addPetForm.value.petName;
      const desc = this.addPetForm.value.petDesc;
      const age = this.addPetForm.value.petAge;
      const price = this.addPetForm.value.petPrice;
      const gender = this.addPetForm.value.petGender;
      const breed = this.addPetForm.value.breedId;
      const data = new CreatePetModel(name, desc, age, price, gender, breed)
      this.petService.addPet(data).subscribe({
        next: (res) => {
          this.snackbarService.open({ message: res, panelClass: [StaticClass.sucSnackbar] })
          this.router.navigate([`../${StaticClass.MyPetPage}`], { relativeTo: this.route })
        },
        error: (err) => {
          this.snackbarService.open({ message: err.error, panelClass: [StaticClass.errorSnackbar] })
        }
      })
    }
  }
  get f() {
    return this.addPetForm!.controls;
  }

  get b() {
    return this.addBreedForm!.controls;
  }

  get s() {
    return this.addSpeciesForm!.controls;
  }

  getErrorMessages(controlName: string) {
    const requiredError = "This field is required";
    const lengthError = "Description must be atleast 10 characters";
    const required = 'required';
    const minLength = 'minlength';
    const petDesc = 'petDesc';
    const petGender = 'petGender';
    const control = this.addPetForm!.get(controlName);
    if (control?.hasError(required)) {
      return requiredError;
    }
    if (controlName == petDesc && control?.hasError(minLength)) {
      return lengthError;
    }
    return '';
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
