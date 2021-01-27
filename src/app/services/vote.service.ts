import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VotePayload } from '../common/vote-payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private baseUrl = "http://localhost:8080/api/votes/";

  constructor(private http: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post(this.baseUrl, votePayload);
  }
}
