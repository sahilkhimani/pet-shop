import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  baseUrl = environment.apiUrl + 'Species';
  constructor(private client : HttpClient) { }

  getAll() : Observable<ResponseModel>{
    return this.client.get<ResponseModel>(`${this.baseUrl}/GetAll`);
  }
}
