import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/common/ingredient';
import { Recipe } from 'src/app/common/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe = new Recipe();
  ingredients : Ingredient[] ;
  constructor( private router : ActivatedRoute,
    private recipeService : RecipeService) { }

  ngOnInit(): void {
    this.getRecipeDetails();
  }


  getRecipeDetails(){
    const theRecipeId : number =+this.router.snapshot.paramMap.get('id');
    this.recipeService.getRecipeById(theRecipeId).subscribe(
      data => {
        this.recipe =data ;
        this.ingredients = this.recipe.ingredients ;
      }
    )
  }



}
