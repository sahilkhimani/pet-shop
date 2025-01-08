import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { map, Observable } from 'rxjs';
import { BreedService } from './breed.service';

@Injectable({
  providedIn: 'root'
})
export class PetService implements OnInit{

  private baseUrl = environment.apiUrl + 'Pet';
  private breeds : any;
  constructor(
    private client: HttpClient,
    private breedService : BreedService
  ) { }
  ngOnInit(): void {
    this.getAllBreed().subscribe(
      (res) => {
        this.breeds = res;
      }
    )
  }

  getAll() : Observable<ResponseModel>{
    return this.client.get<ResponseModel>(`${this.baseUrl}/GetAll`);
  }

  getAllBreed(){
    return this.breedService.getAll();
  }
}
