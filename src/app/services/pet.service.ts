import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { Observable } from 'rxjs';
import { BreedService } from './breed.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private baseUrl = environment.apiUrl + 'Pet';
  constructor(
    private client: HttpClient,
    private breedService : BreedService
  ) { }

  getAll() : Observable<ResponseModel>{
    return this.client.get<ResponseModel>(`${this.baseUrl}/GetAll`);
  }

  getAllBreed(){
    return this.breedService.getAll();
  }
}
