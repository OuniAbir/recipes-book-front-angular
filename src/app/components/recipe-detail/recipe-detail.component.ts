import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/common/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe = new Recipe();
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
      }
    )
  }



}
