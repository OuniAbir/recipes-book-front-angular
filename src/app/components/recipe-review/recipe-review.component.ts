import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentPayload } from 'src/app/common/comment-payload';
import { Recipe } from 'src/app/common/recipe';
import { CommentService } from 'src/app/services/comment.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-review',
  templateUrl: './recipe-review.component.html',
  styleUrls: ['./recipe-review.component.css']
})
export class RecipeReviewComponent implements OnInit {

  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  @Input() commentCount : number ;
  recipe: Recipe;
  recipeId: number;

  constructor(
    private router: ActivatedRoute,
    private commentService: CommentService,
    private recipeService: RecipeService,
  ) {
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });

    this.commentPayload = {
      text: '',
      recipeId: 0
    };
    const theRecipeId: number = +this.router.snapshot.paramMap.get('id');
    this.recipeId = theRecipeId;

  }
  ngOnInit() {
    this.getAllCommentsForRecipe(this.recipeId);
  }
  postComment() {
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentPayload.recipeId = this.recipeId;

    this.commentService.postComment(this.commentPayload).subscribe(
      success => {
        this.commentForm.get('text').setValue('');
        this.getAllCommentsForRecipe(this.recipeId);

      },
      error => { throwError(error); }

    )
  }

  getAllCommentsForRecipe(recipeId: number) {
    this.commentService.getAllCommentsForRecipe(recipeId).subscribe(
      data => {
        this.comments = data;
      }
    );

    this.recipeService.getRecipeById(this.recipeId).subscribe(
      data => {
        this.commentCount = data.commentCount;
      }
    )
  }

}
