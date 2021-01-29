import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../common/recipe';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { };

  getAllRecipeCategory(): Observable<any> {
    console.log(`${this.baseUrl}api/recipe-category/`);
    return this.httpClient.get(`${this.baseUrl}api/recipe-category/`);
  }

  getAllRecipies(): Observable<any> {
    console.log(`${this.baseUrl}api/recipes/`);
    return this.httpClient.get(`${this.baseUrl}api/recipes/`);

  }

  getAllRecipiesByCategory(currentCategoryId: number): Observable<any> {
    console.log(`${this.baseUrl}api/recipes/by-category/${currentCategoryId}`);
    return this.httpClient.get(`${this.baseUrl}api/recipes/by-category/${currentCategoryId}`);
  }

  getAllRecipiesByNameContaining(keyword: String): Observable<any> {
    console.log(`${this.baseUrl}api/recipes/by-name/${keyword}`);
    return this.httpClient.get(`${this.baseUrl}api/recipes/by-name/${keyword}`);
  }

  getRecipeById(theRecipeId: number): Observable<Recipe> {
    console.log(`${this.baseUrl}api/recipes/${theRecipeId}`);
    return this.httpClient.get<Recipe>(`${this.baseUrl}api/recipes/${theRecipeId}`);
  }

}
