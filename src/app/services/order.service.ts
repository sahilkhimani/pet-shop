import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { CreateOrderModel } from '../models/CreateOrder.model';
import { GetOrdersModel } from '../models/get-orders.model';
import { SingleResponseModel } from '../models/singleResponse.model';
import { UpdateOrderStatusModel } from '../models/update-order-status.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.apiUrl + 'Order';
  private GetPetOrderStatusApiUtl = this.baseUrl + '/GetPetOrderStatus';
  private CreateOrderApiUrl = this.baseUrl + '/CreateOrder';
  private GetBuyerOrderApiUrl = this.baseUrl + '/GetMyOrders';
  private GetSellerOrderApiUrl = this.baseUrl + '/GetSellerOrders';
  private GetOrderByIdApiUrl = this.baseUrl + '/GetById';
  private DeleteOrderApiUrl = this.baseUrl + '/Delete';
  private cancelOrderApiUrl = this.baseUrl + '/CancelOrder';
  private updateOrderStatusApiUrl = this.baseUrl + '/UpdateOrderStatus';

  constructor(private client: HttpClient) { }

  getPetOrderStatus(id: number): Observable<string> {
    return this.client.get<SingleResponseModel>(`${this.GetPetOrderStatusApiUtl}/${id}`).pipe(
      map(response => {
        return response.data;
      })
    )
  }

  CreateOrder(order: CreateOrderModel): Observable<string> {
    return this.client.post(this.CreateOrderApiUrl,
      order,
      { responseType: 'text' })
  }

  //not checked
  getBuyerOrders(): Observable<GetOrdersModel[]> {
    return this.client.get<ResponseModel>(this.GetBuyerOrderApiUrl).pipe(
      map(response => response.data || [])
    )
  }

  //not checked
  getSellerOrders(): Observable<GetOrdersModel[]> {
    return this.client.get<ResponseModel>(this.GetSellerOrderApiUrl).pipe(
      map(response => response.data || [])
    )
  }

  //not checked
  getOrderById(id: number): Observable<GetOrdersModel> {
    return this.client.get<SingleResponseModel>(`${this.GetOrderByIdApiUrl}/${id}`).pipe(
      map(response => response.data)
    )
  }

  //not checked
  deleteOrder(id: number): Observable<string> {
    return this.client.get(`${this.DeleteOrderApiUrl}/${id}`,
      { responseType: 'text' }
    )
  }

  //not checked
  cancelOrder(id: number, status: UpdateOrderStatusModel): Observable<string> {
    return this.client.put(`${this.cancelOrderApiUrl}/${id}`,
      status,
      { responseType: 'text' }
    )
  }

  //not checked
  updateOrderStatus(id: number, status: UpdateOrderStatusModel): Observable<string> {
    return this.client.put(`${this.updateOrderStatusApiUrl}/${id}`,
      status,
      { responseType: 'text' }
    )
  }
}
