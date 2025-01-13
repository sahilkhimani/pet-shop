import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { BreedModel } from '../models/breed.model';

@Injectable({
  providedIn: 'root'
})
export class BreedService {
  private baseUrl = environment.apiUrl + 'Breed';
  constructor(private client: HttpClient) { }

  getAll(): Observable<BreedModel[]> {
    return this.client.get<ResponseModel>(`${this.baseUrl}/GetAll`).pipe(
      map(response => {
        return response.data?.map((breed) => new BreedModel(breed.breedId, breed.breedName, breed.speciesId)) || []
      })
    )
  }
}
