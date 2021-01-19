import { Component, OnInit } from '@angular/core';
import { RecipeCategory } from 'src/app/common/recipe-category';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {
  categories : RecipeCategory[]  ;
  constructor( private recipeService  : RecipeService ) { }


  ngOnInit(): void {
    this.recipeService.getAllRecipeCategory().subscribe(
      data => {
        this.categories = data;
      }
    ) ;
  }
}
