import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/common/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipies : Recipe[]  ;
  constructor( private recipeService  : RecipeService ) { }


  ngOnInit(): void {
    this.recipeService.getAllRecipies().subscribe(
      data => {
        this.recipies = data;
      }
    ) ;
  }

}
