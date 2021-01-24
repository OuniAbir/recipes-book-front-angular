import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupRequestPayload } from "../auth/signup/signup-request-payload";
import { LoginRequestPayload } from "../auth/login/login-request-payload";
import { LoginResponse } from '../auth/login/login-response';
import { map } from 'rxjs/operators';
import { LocalStorageService } from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8080/api/auth/";
  constructor(private HttpClient : HttpClient,
              private localStorageService : LocalStorageService) { }

  signup(SignupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.HttpClient.post(`${this.baseUrl}signup`,SignupRequestPayload, {responseType: 'text'}) ;

  }

  login(loginRequestPayload: LoginRequestPayload) : Observable<boolean> {
    return this.HttpClient.post<LoginResponse>(`${this.baseUrl}login`, loginRequestPayload).pipe(
      map((
        data => {
          this.localStorageService.store('authenticationToken', data.authenticationToken);
          this.localStorageService.store('expiresAt', data.expiresAt);
          this.localStorageService.store('refreshToken', data.refreshToken);
          this.localStorageService.store('username', data.username) ;
          return true;
        }
      ))
    ) ;

  }
}
