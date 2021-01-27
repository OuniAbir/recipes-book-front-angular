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
  voteProps = { voteCount : 0, upvote : false , downvote: false };
  commentCount : number ;

  constructor( private router : ActivatedRoute,
    private recipeService : RecipeService) { }

  ngOnInit(): void {
    this.getRecipeDetails();
    this.commentCount = this.recipe.commentCount;

  }


  getRecipeDetails(){
    const theRecipeId : number =+this.router.snapshot.paramMap.get('id');
    this.recipeService.getRecipeById(theRecipeId).subscribe(
      data => {
        this.recipe =data ;
        this.voteProps = {voteCount : data.voteCount, upvote :data.upVote,downvote: data.downVote  };
       }
    )
  }



}
