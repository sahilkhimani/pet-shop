import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.apiUrl + 'Order';
  
  constructor(private client: HttpClient) { }

  getPetOrderStatus(id : number) : Observable<string> {
    return this.client.get<any>(`${this.baseUrl}/GetPetOrderStatus/${id}`).pipe(
      map(response => {
        return response.data;
      })
    )
  }
}
