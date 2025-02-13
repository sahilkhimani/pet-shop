import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DecodeTokenService {

  constructor() { }

  decodeJwtToken(token: string): UserModel | null {
    try {
      const decodedToken = jwtDecode(token) as { [key: string]: any };
      const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const name = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      return new UserModel(name, email, userId, role);
    }
    catch (error) {
      console.log(error);
      return null;
    }
  }

}
