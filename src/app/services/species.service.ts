import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateSpeciesModel } from '../models/create-species.model';
import { ResponseModel } from '../models/response.model';
import { SingleResponseModel } from '../models/singleResponse.model';
import { SpeciesModel } from '../models/species.model';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private baseUrl = environment.apiUrl + 'Species';
  private GetAllApiUrl = this.baseUrl + '/GetAll';
  private CreateSpeciesApiUrl = this.baseUrl + '/Create';
  private GetByIdApiUrl = this.baseUrl + '/GetById';
  private UpdateSpeciesApiUrl = this.baseUrl + '/Update';
  private DeleteSpeciesApiUrl = this.baseUrl + '/Delete';

  private speciesListUpdated = new BehaviorSubject<boolean>(false);
  constructor(private client: HttpClient) { }

  setSpeciesListUpdate(updated: boolean) {
    this.speciesListUpdated.next(updated);
  }

  getSpeciesListUpdate(): Observable<boolean> {
    return this.speciesListUpdated.asObservable();
  }

  getAll(): Observable<SpeciesModel[]> {
    return this.client.get<ResponseModel>(this.GetAllApiUrl).pipe(
      map(response => {
        this.setSpeciesListUpdate(false);
        return response.data?.map((species) => new SpeciesModel(species.speciesId, species.speciesName)) || []
      })
    )
  }

  createSpecies(speciesName: CreateSpeciesModel): Observable<string> {
    return this.client.post(
      this.CreateSpeciesApiUrl, speciesName,
      { responseType: 'text' })
  }

  //not tested
  getSpeciesById(id: number): Observable<SpeciesModel> {
    return this.client.get<SingleResponseModel>(
      this.GetByIdApiUrl
    ).pipe(
      map(response => response.data)
    )
  }

  deleteSpecies(id: number): Observable<string> {
    return this.client.delete(`${this.DeleteSpeciesApiUrl}/${id}`,
      { responseType: 'text' }
    )
  }

  updateSpecies(id: number, speciesData: CreateSpeciesModel): Observable<string> {
    return this.client.put(
      `${this.UpdateSpeciesApiUrl}/${id}`,
      speciesData,
      { responseType: 'text' }
    )
  }
}
