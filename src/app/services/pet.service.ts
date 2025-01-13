import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { concatMap, forkJoin, map, Observable, switchMap } from 'rxjs';
import { BreedService } from './breed.service';
import { SpeciesService } from './species.service';
import { CategModel } from '../models/categ.model';
import { SpeciesModel } from '../models/species.model';
import { BreedModel } from '../models/breed.model';
import { PetModel } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private petImgsList: CategModel[] = [
    {
      name: 'dog',
      img: 'assets/images/dog-icon.jpg'
    },
    {
      name: 'cat',
      img: 'assets/images/cat-icon.jpg'
    },
    {
      name: 'parrot',
      img: 'assets/images/parrot-icon.jpg'
    },
    {
      name: 'horse',
      img: 'assets/images/horse-icon.jpg'
    },
    {
      name: 'other',
      img: 'assets/images/other-icon.jpg'
    }
  ]

  private speciesList: SpeciesModel[] = [];
  private breedList: BreedModel[] = [];

  private baseUrl = environment.apiUrl + 'Pet';
  constructor(
    private client: HttpClient,
    private breedService: BreedService,
    private specieService: SpeciesService
  ) { }

  getAll(): Observable<PetModel[]> {
    return this.getAllBreed().pipe(
      concatMap(breeds => {
        this.breedList = breeds;
        return this.getAllSpecies();
      }),
      concatMap(species => {
        this.speciesList = species;
        return this.client.get<ResponseModel>(`${this.baseUrl}/GetAll`);
      }),
      map(response => {
        return response.data?.map(
          pet => {
            const breed = this.breedList.find(b => b.BreedId === pet.breedId);
            const specie = this.speciesList.find(s => s.SpeciesId === breed?.SpeciesId);
            const petImg = this.petImgsList.find(i => i.name === specie?.SpeciesName?.toLowerCase());
            return new PetModel(
              pet.petId,
              pet.petName,
              petImg?.img,
              pet.petAge,
              pet.petPrice,
              pet.petGender,
              pet.breedId,
              breed?.BreedName || '',
              breed?.SpeciesId || 0,
              specie?.SpeciesName || '',
              pet.ownerId,
              pet.petDesc
            )
          }
        ) || [];
      })
    )
  }

  getAllBreed() {
    return this.breedService.getAll();
  }

  getAllSpecies() {
    return this.specieService.getAll();
  }
}
