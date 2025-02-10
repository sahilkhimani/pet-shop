import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { BreedModel } from '../models/breed.model';
import { CreateBreedModel } from '../models/create-breed.model';
import { SingleResponseModel } from '../models/singleResponse.model';

@Injectable({
  providedIn: 'root'
})
export class BreedService {
  private baseUrl = environment.apiUrl + 'Breed';
  private GetAllApiUrl = this.baseUrl + '/GetAll'
  private CreateBreedApiUrl = this.baseUrl + '/Create';
  private GetByIdApiUrl = this.baseUrl + '/GetById';
  private UpdateBreedApiUrl = this.baseUrl + '/Update';
  private DeleteBreedApiUrl = this.baseUrl + '/Delete';
  private GetBreedBySpeciesIdUrl = this.baseUrl + '/GetBySpeciesId';

  private breedListUpdated = new BehaviorSubject<boolean>(false);

  constructor(private client: HttpClient) { }

  setBreedListUpdate(updated: boolean) {
    this.breedListUpdated.next(updated);
  }

  getBreedListUpdate(): Observable<boolean> {
    return this.breedListUpdated.asObservable();
  }

  getAll(): Observable<BreedModel[]> {
    return this.client.get<ResponseModel>(this.GetAllApiUrl).pipe(
      map(response => {
        this.setBreedListUpdate(false);
        return response.data?.map((breed) => new BreedModel(breed.breedId, breed.breedName, breed.speciesId)) || []
      })
    )
  }

  //not tested
  createBreed(breedData: CreateBreedModel): Observable<string> {
    return this.client.post(
      this.CreateBreedApiUrl, breedData,
      { responseType: 'text' })
  }

  //not tested
  getBreedById(id: number): Observable<BreedModel> {
    return this.client.get<SingleResponseModel>(
      this.GetByIdApiUrl
    ).pipe(
      map(response => response.data)
    )
  }

  //not tested
  deleteBreed(id: number): Observable<string> {
    return this.client.delete(`${this.DeleteBreedApiUrl}/${id}`,
      { responseType: 'text' }
    )
  }

  //not tested
  updateBreed(id: number, breedData: CreateBreedModel): Observable<string> {
    return this.client.put(
      `${this.UpdateBreedApiUrl}/${id}`,
      breedData,
      { responseType: 'text' }
    )
  }

  //not tested 
  getBreedBySpeciesId(id: number): Observable<BreedModel[]> {
    return this.client.get<ResponseModel>(
      `${this.GetBreedBySpeciesIdUrl}/${id}`).pipe(
        map(response => response.data || [])
      )
  }
}
