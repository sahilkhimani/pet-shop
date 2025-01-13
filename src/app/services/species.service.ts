import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { map, Observable } from 'rxjs';
import { SpeciesModel } from '../models/species.model';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private baseUrl = environment.apiUrl + 'Species';
  constructor(private client: HttpClient) { }

  getAll(): Observable<SpeciesModel[]> {
    return this.client.get<ResponseModel>(`${this.baseUrl}/GetAll`).pipe(
      map(response => {
        return response.data?.map((species) => new SpeciesModel(species.speciesId, species.speciesName)) || []
      })
    )
  }
}
