import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../common/recipe';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = "http://localhost:8080/api";
  constructor(private httpClient: HttpClient) { };

  getAllRecipeCategory(): Observable<any> {
    console.log(`${this.baseUrl}/recipe-category/`);
    return this.httpClient.get(`${this.baseUrl}/recipe-category/`);
  }

  getAllRecipies(): Observable<any> {
    console.log(`${this.baseUrl}/recipes/`);
    return this.httpClient.get(`${this.baseUrl}/recipes/`);

  }

  getAllRecipiesByCategory(currentCategoryId: number): Observable<any> {
    console.log(`${this.baseUrl}/recipes/by-category/${currentCategoryId}`);
    return this.httpClient.get(`${this.baseUrl}/recipes/by-category/${currentCategoryId}`);
  }

  getAllRecipiesByNameContaining(keyword: String): Observable<any> {
    console.log(`${this.baseUrl}/recipes/by-name/${keyword}`);
    return this.httpClient.get(`${this.baseUrl}/recipes/by-name/${keyword}`);
  }

  getRecipeById(theRecipeId: number): Observable<Recipe> {
    console.log(`${this.baseUrl}/recipes/${theRecipeId}`);
    return this.httpClient.get<Recipe>(`${this.baseUrl}/recipes/${theRecipeId}`);
  }

}
