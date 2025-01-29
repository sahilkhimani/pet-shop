import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SpeciesModel } from '../models/species.model';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private baseUrl = environment.apiUrl + 'Species';
  private speciesListUpdated = new BehaviorSubject<boolean>(false);
  constructor(private client: HttpClient) { }

  setSpeciesListUpdate(updated: boolean) {
    this.speciesListUpdated.next(updated);
  }

  getSpeciesListUpdate(): Observable<boolean> {
    return this.speciesListUpdated.asObservable();
  }

  getAll(): Observable<SpeciesModel[]> {
    return this.client.get<ResponseModel>(`${this.baseUrl}/GetAll`).pipe(
      map(response => {
        this.setSpeciesListUpdate(false);
        return response.data?.map((species) => new SpeciesModel(species.speciesId, species.speciesName)) || []
      })
    )
  }
}
