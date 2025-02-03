import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { CreateOrderModel } from '../models/CreateOrder.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.apiUrl + 'Order';
  private GetPetOrderStatusApiUtl = this.baseUrl + '/GetPetOrderStatus';
  private CreateOrderApiUrl = this.baseUrl + '/CreateOrder';

  constructor(private client: HttpClient) { }

  getPetOrderStatus(id: number): Observable<string> {
    return this.client.get<any>(`${this.baseUrl}/GetPetOrderStatus/${id}`).pipe(
      map(response => {
        return response.data;
      })
    )
  }

  CreateOrder(order: CreateOrderModel): Observable<string> {
    return this.client.post<string>(this.CreateOrderApiUrl,
      order,
      { responseType: 'text' as 'json' })
  }
}
