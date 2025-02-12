import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { BehaviorSubject, concatMap, forkJoin, map, mergeMap, Observable, switchMap } from 'rxjs';
import { BreedService } from './breed.service';
import { SpeciesService } from './species.service';
import { CategModel } from '../models/categ.model';
import { SpeciesModel } from '../models/species.model';
import { BreedModel } from '../models/breed.model';
import { PetModel } from '../models/pet.model';
import { OrderService } from './order.service';
import { CreatePetModel } from '../models/create-pet.model';
import { SingleResponseModel } from '../models/singleResponse.model';
import { SimplePetModel } from '../models/simple-pet.model';

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
  private editModeSubject = new BehaviorSubject<boolean>(false);
  editMode$ = this.editModeSubject.asObservable()

  private baseUrl = environment.apiUrl + 'Pet';
  private GetAllApiUrl = this.baseUrl + '/GetAll';
  private AddPetApiUrl = this.baseUrl + '/Add';
  private GetPetByIdApiUrl = this.baseUrl + '/GetById';
  private DeletePetApiUrl = this.baseUrl + '/Delete';
  private UpdatePetApiUrl = this.baseUrl + '/Update';
  private GetPetByBreedApiUrl = this.baseUrl + '/GetPetsByBreedId';
  private GetPetByGenderApiUrl = this.baseUrl + '/GetPetsByGender';
  private GetPetByAgeApiUrl = this.baseUrl + '/GetPetsByAge';
  private GetPetByAgeRangeApiUrl = this.baseUrl + '/GetPetsByAgeRange';
  private GetYourPetsApiUrl = this.baseUrl + '/GetYourPets';

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

  setEditMode(value: boolean) {
    this.editModeSubject.next(value);
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

  addPet(petData: CreatePetModel): Observable<string> {
    return this.client.post(this.AddPetApiUrl, petData,
      { responseType: 'text' }
    )
  }

  //not tested
  getPetById(id: number): Observable<SimplePetModel> {
    return this.client.get<SingleResponseModel>(`${this.GetPetByIdApiUrl}/${id}`).pipe(
      map(response => response.data)
    )
  }

  deletePet(id: number): Observable<string> {
    return this.client.delete(`${this.DeletePetApiUrl}/${id}`,
      { responseType: 'text' }
    )
  }

  updatePet(id: number, pet: CreatePetModel) {
    return this.client.put(`${this.UpdatePetApiUrl}/${id}`, pet,
      { responseType: 'text' }
    )
  }

  //not tested
  getPetByBreedId(id: number): Observable<SimplePetModel[]> {
    return this.client.get<ResponseModel>(`${this.GetPetByBreedApiUrl}/${id}`).pipe(
      map(response => response.data || [])
    )
  }

  //not tested
  getPetByGender(gender: string): Observable<SimplePetModel[]> {
    return this.client.get<ResponseModel>(`${this.GetPetByGenderApiUrl}/${gender}`).pipe(
      map(response => response.data || [])
    )
  }

  //not tested
  getPetByAge(age: number): Observable<SimplePetModel[]> {
    return this.client.get<ResponseModel>(`${this.GetPetByAgeApiUrl}/${age}`).pipe(
      map(response => response.data || [])
    )
  }

  //not tested
  getYourPets(): Observable<SimplePetModel[]> {
    return this.client.get<ResponseModel>(this.GetYourPetsApiUrl).pipe(
      map(response => response.data || [])
    )
  }

  //not tested
  getPetsByAgeRange(minAge: number, maxAge: number): Observable<SimplePetModel[]> {
    const params = new HttpParams()
      .set('minAge', minAge.toString())
      .set('maxAge', maxAge.toString())
    return this.client.get<ResponseModel>(this.GetPetByAgeRangeApiUrl, { params }).pipe(
      map(response => response.data || [])
    )
  }
}









