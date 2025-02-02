import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { concatMap, forkJoin, map, mergeMap, Observable, switchMap } from 'rxjs';
import { BreedService } from './breed.service';
import { SpeciesService } from './species.service';
import { CategModel } from '../models/categ.model';
import { SpeciesModel } from '../models/species.model';
import { BreedModel } from '../models/breed.model';
import { PetModel } from '../models/pet.model';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private petImgsList: CategModel[] = [
    {
      name: 'dogs',
      img: 'assets/images/dog-icon.jpg'
    },
    {
      name: 'cats',
      img: 'assets/images/cat-icon.jpg'
    },
    {
      name: 'birds',
      img: 'assets/images/parrot-icon.jpg'
    },
    {
      name: 'horses',
      img: 'assets/images/horse-icon.jpg'
    },
    {
      name: 'others',
      img: 'assets/images/other-icon.jpg'
    }
  ]

  private speciesList: SpeciesModel[] = [];
  private breedList: BreedModel[] = [];
  private productDetail: PetModel = {};
  breedListFetched = false;

  private baseUrl = environment.apiUrl + 'Pet';
  private GetAllApiUrl: string = this.baseUrl + '/GetAll';

  constructor(
    private client: HttpClient,
    private breedService: BreedService,
    private specieService: SpeciesService,
    private orderService: OrderService
  ) {
    this.specieService.getSpeciesListUpdate().subscribe(
      updated => {
        if (updated) {
          this.breedListFetched = false;
        }
      }
    )
    this.breedService.getBreedListUpdate().subscribe(
      updated => {
        if (updated) {
          this.breedListFetched = false;
        }
      }
    )
  }

  getAll(): Observable<PetModel[]> {
    if (!this.breedListFetched) {
      return this.getAllBreed().pipe(
        switchMap(breeds => {
          this.breedList = breeds;
          this.breedListFetched = true;
          return this.getAllSpecies();
        }),
        switchMap(species => {
          this.speciesList = species;
          return this.client.get<ResponseModel>(this.GetAllApiUrl);
        }),
        switchMap(response => this.handlePetData(response)!)
      );
    }
    else {
      return this.client.get<ResponseModel>(this.GetAllApiUrl).pipe(
        switchMap(response => this.handlePetData(response)!),
      )
    }
  }

  handlePetData(response: ResponseModel) {
    const petData = response.data?.map(
      pet => {
        const breed = this.breedList.find(b => b.BreedId === pet.breedId);
        const specie = this.speciesList.find(s => s.SpeciesId === breed?.SpeciesId);
        const petImg = this.petImgsList.find(i => i.name === specie?.SpeciesName?.toLowerCase());
        return this.getPetOrderStatus(pet.petId).pipe(
          map(orderStatus => {
            return new PetModel(
              pet.petId,
              pet.petName,
              petImg?.img ?? this.petImgsList[this.petImgsList.length - 1].img,
              pet.petAge,
              pet.petPrice,
              pet.petGender,
              pet.breedId,
              breed?.BreedName || '',
              breed?.SpeciesId || 0,
              specie?.SpeciesName || '',
              pet.ownerId,
              pet.petDesc,
              orderStatus
            )
          })
        )
      }
    ) || [];
    return forkJoin(petData);
  }

  setProductDetail(product: PetModel) {
    this.productDetail = product;
  }

  getProductDetail(): PetModel {
    return this.productDetail;
  }

  getPetOrderStatus(id: number) {
    return this.orderService.getPetOrderStatus(id);
  }

  getAllBreed() {
    return this.breedService.getAll();
  }

  getAllSpecies() {
    return this.specieService.getAll();
  }

}









