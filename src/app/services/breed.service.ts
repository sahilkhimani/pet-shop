import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class BreedService {
  baseUrl = environment.apiUrl + 'Breed';
  constructor(private client : HttpClient) { }

  getAll() : Observable<ResponseModel>{
    return this.client.get<ResponseModel>(`${this.baseUrl}/GetAll`);
  }
}
