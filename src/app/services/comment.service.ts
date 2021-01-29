import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentPayload } from '../common/comment-payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = environment.baseUrl ;
  constructor(private httpClient: HttpClient) { }

  getAllCommentsForRecipe(recipeId: number): Observable<CommentPayload[]>  {
    console.log( `${this.baseUrl}api/comments/by-recipe/${recipeId}`);
    return this.httpClient.get<CommentPayload[]>( `${this.baseUrl}api/comments/by-recipe/${recipeId}`);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post( `${this.baseUrl}api/comments/` , commentPayload);
  }

}
