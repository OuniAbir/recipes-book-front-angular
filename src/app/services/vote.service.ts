import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VotePayload } from '../common/vote-payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private baseUrl =  environment.baseUrl ;

  constructor(private http: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post( `${this.baseUrl}api/votes/`, votePayload);
  }
}
