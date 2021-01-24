import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupRequestPayload } from "../auth/signup/signup-request-payload";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = "http://localhost:8080/api/auth/";
  constructor(private HttpClient : HttpClient) { }
  signup(SignupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.HttpClient.post(`${this.baseUrl}signup`,SignupRequestPayload, {responseType: 'text'}) ;

  }

}
