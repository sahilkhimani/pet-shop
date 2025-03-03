import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { ResponseModel } from '../models/response.model';
import { SingleResponseModel } from '../models/singleResponse.model';
import { UpdateUserModel } from '../models/update-user.model';
import { UserDataModel } from '../models/userdata.model';
import { LocalStorageService } from '../utility/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl + 'User';
  private loginApiUrl = this.baseUrl + '/Login';
  private registerApiUrl = this.baseUrl + '/Register';
  private getAllApiUrl = this.baseUrl + '/GetAll';
  private getByIdApiUrl = this.baseUrl + '/GetById';
  private deleteUserApiUrl = this.baseUrl + '/Delete';
  private updateUserApiUrl = this.baseUrl + '/Update';

  constructor(
    private client: HttpClient,
    private localStorageService: LocalStorageService,
  ) { }

  Login(loginData: LoginModel): Observable<string> {
    return this.client.post(
      this.loginApiUrl,
      loginData,
      { responseType: 'text' }
    )
  }

  register(registerData: RegisterModel): Observable<string> {
    return this.client.post(
      this.registerApiUrl,
      registerData,
      { responseType: 'text' }
    )
  }

  getAllUser(): Observable<UserDataModel[]> {
    return this.client.get<ResponseModel>(this.getAllApiUrl).pipe(
      map(response => response.data || [])
    )
  }

  getById(userId: string): Observable<UserDataModel> {
    return this.client.get<SingleResponseModel>(`${this.getByIdApiUrl}/${userId}`).pipe(
      map(response => response.data)
    )
  }

  deleteUser(userId: string): Observable<string> {
    return this.client.delete(`${this.deleteUserApiUrl}/${userId}`,
      { responseType: 'text' }
    );
  }

  updateUser(userId: string, data: UpdateUserModel): Observable<string> {
    return this.client.put(
      `${this.updateUserApiUrl}/${userId}`,
      data,
      { responseType: 'text' }
    )
  }
}
