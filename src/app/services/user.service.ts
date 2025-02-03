import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl + 'User';
  private loginApiUrl = this.baseUrl + '/Login';
  private registerApiUrl = this.baseUrl + '/Register';
  constructor(private client: HttpClient) { }

  Login(loginData: LoginModel): Observable<any> {
    return this.client.post(
      this.loginApiUrl,
      loginData,
      { responseType: 'text' as 'json' }
    )
  }

  register(registerData: RegisterModel): Observable<any> {
    return this.client.post(
      this.registerApiUrl,
      registerData,
      { responseType: 'text' as 'json' }
    )
  }
}
