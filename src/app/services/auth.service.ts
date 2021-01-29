import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, Subject, iif } from 'rxjs';
import { SignupRequestPayload } from "../auth/signup/signup-request-payload";
import { LoginRequestPayload } from "../auth/login/login-request-payload";
import { LoginResponse } from '../auth/login/login-response';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from "ngx-webstorage";
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {



  loggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false); /* use behavior to hold the value to be sent VS subject desn't hold a value*/
  username: Subject<string> = new BehaviorSubject<string>(null);

  private baseUrl = environment.baseUrl ;
  constructor(private HttpClient: HttpClient,
    private localStorageService: LocalStorageService) { }

  signup(SignupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.HttpClient.post(`${this.baseUrl}api/auth/signup`, SignupRequestPayload, { responseType: 'text' });

  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    console.log();

    return this.HttpClient.post<LoginResponse>(`${this.baseUrl}api/auth/login`, loginRequestPayload).pipe(
      map((
        data => {
          /* login success, store login response in local storage */
          this.localStorageService.store('authenticationToken', data.authenticationToken);
          this.localStorageService.store('expiresAt', data.expiresAt);

          this.localStorageService.store('refreshToken', data.refreshToken);
          this.localStorageService.store('username', data.username);

          this.loggedIn.next(true);
          this.username.next(data.username);

          return true;
        }
      ))
    );
  }
  getauthenticationToken() {
    const now = new Date();
    console.log(` ${now.toJSON()}  +   ${this.getexpiresAt()}`);

    if (this.getexpiresAt() == null) {
      /* not logged in */
      console.log(" getauthenticationToken : JWT is null ");
      return null;
    }else if(now.toJSON() > this.getexpiresAt()) {
      console.log(" getauthenticationToken : JWT expires ");
      return null;

    } else {
      console.log(" getauthenticationToken : JWT still valid ");
      return this.localStorageService.retrieve('authenticationToken');

    }
  }

  getexpiresAt() {
    return this.localStorageService.retrieve('expiresAt');
  }

  getrefreshToken() {

    return this.localStorageService.retrieve('refreshToken');
  }

  getusername() {
    return this.localStorageService.retrieve('username');
  }

  refreshToken() {

    const refreshTokenPayload = {
      refreshToken: this.getrefreshToken(),
      username: this.getusername(),
    }

    console.log(`refreshToken  : ${this.baseUrl}api/auth/refresh/token , ${refreshTokenPayload}`);
    return this.HttpClient.post<LoginResponse>(`${this.baseUrl}api/auth/refresh/token`, refreshTokenPayload).pipe(
      /* new JWT , expire date , savee them to the local storage */
      /*  tap : return an Observable that is identical to the source*/
      tap(
        res => {
          this.localStorageService.store('authenticationToken', res.authenticationToken);
          this.localStorageService.store('expiresAt', res.expiresAt);
        })
    )


  }

  logout() {
    const LogoutRequest = {
      refreshToken: this.getrefreshToken(),
      username: this.getusername()
    };

    this.HttpClient.post(`${this.baseUrl}api/auth/logout`, LogoutRequest, { responseType: 'text' }).subscribe(
      success => {
        console.log(success);
        this.loggedIn.next(false);
        this.username.next('');
      },
      error => { throwError(error); })

    /* clear local storage*/
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('expiresAt');
    this.localStorageService.clear('refreshToken');
    this.localStorageService.clear('username');
  }
  isLoggedIn() {

    if (this.getauthenticationToken() != null) {
      this.loggedIn.next(true);
      this.username.next(this.localStorageService.retrieve('username'));
    }
  }
}
