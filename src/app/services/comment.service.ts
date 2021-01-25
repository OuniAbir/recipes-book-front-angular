import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from '../common/comment-payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = "http://localhost:8080/api/comments/" ;
  constructor(private httpClient: HttpClient) { }

  getAllCommentsForRecipe(recipeId: number): Observable<CommentPayload[]>  {
    console.log( `${this.baseUrl}by-recipe/${recipeId}`);
    return this.httpClient.get<CommentPayload[]>( `${this.baseUrl}by-recipe/${recipeId}`);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post(this.baseUrl, commentPayload);
  }

}
