import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BreedModel } from '../models/breed.model';
import { CreateBreedModel } from '../models/create-breed.model';
import { ResponseModel } from '../models/response.model';
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

  deleteBreed(id: number): Observable<string> {
    return this.client.delete(`${this.DeleteBreedApiUrl}/${id}`,
      { responseType: 'text' }
    )
  }

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
