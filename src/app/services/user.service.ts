import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl + 'User/';
  constructor(private client: HttpClient) { }

  Login(loginData: LoginModel): Observable<any> {
    return this.client.post(
      `${this.baseUrl}Login`,
      loginData,
      {responseType : 'text' as 'json'}
    ) 
  }
}
