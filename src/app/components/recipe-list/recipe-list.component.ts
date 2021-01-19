import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/common/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipies: Recipe[];
  searchByNameMode: boolean = false;
  constructor(private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      () => { this.handleSearch(); });

  }


  handleSearch() {

    this.searchByNameMode = this.activatedRoute.snapshot.paramMap.has("keyword");
    const keyword : string  = this.activatedRoute.snapshot.paramMap.get("keyword");
    if (this.searchByNameMode) {
      this.recipeService.getAllRecipiesByNameContaining(keyword).subscribe(
        data => {this.recipies = data ; }
      ) ;
    }
    else this.getAllrecipes();

  }
  getAllrecipes() {

    //  check if "id" parameter is availabel
    const hasCotegoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');
    if (hasCotegoryId) {
      const currentCategoryId = + this.activatedRoute.snapshot.paramMap.get('id');
      this.recipeService.getAllRecipiesByCategory(currentCategoryId).subscribe(
        data => {
          this.recipies = data;
        });

    } else {
      // not category id is available ... default is show all
      this.recipeService.getAllRecipies().subscribe(
        data => {
          this.recipies = data;
        });
    }
  }

}
