import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupRequestPayload } from "../auth/signup/signup-request-payload";
import { LoginRequestPayload } from "../auth/login/login-request-payload";
import { LoginResponse } from '../auth/login/login-response';
import { map , tap} from 'rxjs/operators';
import { LocalStorageService } from "ngx-webstorage";
import { getLocaleTimeFormat } from '@angular/common';



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
    console.log();

    return this.HttpClient.post<LoginResponse>(`${this.baseUrl}login`, loginRequestPayload).pipe(
      map((
        data => {
          /* login success, store login response in local storage */
          this.localStorageService.store('authenticationToken', data.authenticationToken);
          this.localStorageService.store('expiresAt', data.expiresAt);

          this.localStorageService.store('refreshToken', data.refreshToken);
          this.localStorageService.store('username', data.username) ;
          return true;
        }
      ))
    ) ;
  }
  getauthenticationToken(){
    const now = new Date() ;
    console.log(` ${now.toJSON()}  +   ${this.getexpiresAt()}`);
    if (now.toJSON() > this.getexpiresAt()) {
      console.log(" getauthenticationToken : JWT expires ");
      return null;

    } else {
      console.log(" getauthenticationToken : JWT still valid ");
      return this.localStorageService.retrieve('authenticationToken');

    }
  }

  getexpiresAt(){
    return this.localStorageService.retrieve('expiresAt');
  }

  getrefreshToken(){
    return this.localStorageService.retrieve('refreshToken');
  }

  getusername(){
    return this.localStorageService.retrieve('username');
  }

  refreshToken(){

    const refreshTokenPayload = {
      refreshToken: this.getrefreshToken(),
      username: this.getusername(),
    }

    console.log(`refreshToken  : ${this.baseUrl}refresh/token , ${refreshTokenPayload}`);
    return this.HttpClient.post<LoginResponse>(`${this.baseUrl}refresh/token`,refreshTokenPayload ).pipe(
    /* new JWT , expire date , savee them to the local storage */
    /*  tap : return an Observable that is identical to the source*/
    tap(
    res => {
      this.localStorageService.store('authenticationToken', res.authenticationToken);
      this.localStorageService.store('expiresAt', res.expiresAt);
    } )
    )
  }

}
