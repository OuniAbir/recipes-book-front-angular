import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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

    console.log(`${this.baseUrl}/recipes`);
    return this.httpClient.get(`${this.baseUrl}/recipes/`);

  }

  getAllRecipiesByCategory(currentCategoryId: number): Observable<any> {
    console.log(`${this.baseUrl}/recipes/findByCategoryId?categoryId=${currentCategoryId}`);
    return this.httpClient.get(`${this.baseUrl}/recipes/findByCategoryId?categoryId=${currentCategoryId}`);
  }

  getAllRecipiesByNameContaining(keyword: String): Observable<any> {
    console.log(`${this.baseUrl}/recipes/findBySearchName?name=${keyword}`);
    return this.httpClient.get(`${this.baseUrl}/recipes/findBySearchName?name=${keyword}`);
  }

  getRecipeById(theRecipeId: number): Observable<any> {

    return this.httpClient.get(`${this.baseUrl}/recipes/findRecipeById?recipeId=${theRecipeId}`);
  }

}
