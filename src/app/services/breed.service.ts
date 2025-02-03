import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { BreedModel } from '../models/breed.model';

@Injectable({
  providedIn: 'root'
})
export class BreedService {
  private baseUrl = environment.apiUrl + 'Breed';
  private GetAllApiUrl = this.baseUrl + '/GetAll'
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
}
