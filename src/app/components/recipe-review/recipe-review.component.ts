import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentPayload } from 'src/app/common/comment-payload';
import { Recipe } from 'src/app/common/recipe';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-recipe-review',
  templateUrl: './recipe-review.component.html',
  styleUrls: ['./recipe-review.component.css']
})
export class RecipeReviewComponent implements OnInit {

  commentForm : FormGroup ;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  recipe : Recipe ;
  recipeId : number ;

  constructor(
    private router : ActivatedRoute,
    private commentService : CommentService
  ){
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });

    this.commentPayload = {
      text: '',
      recipeId : 0
    } ;

  }
  ngOnInit(){
    const theRecipeId : number =+this.router.snapshot.paramMap.get('id');
    this.recipeId = theRecipeId;
    console.log(`RecipeReviewComponent this.recipeId : ${this.recipeId}`);
    this.getAllCommentsForRecipe(this.recipeId);
  }
  postComment(){
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentPayload.recipeId = this.recipeId ;
    console.log(`Post comment (${this.commentPayload }) : on this.recipeId : ${this.recipeId}`);

    this.commentService.postComment(this.commentPayload).subscribe(
      success => {
        this.commentForm.get('text').setValue('');
        this.getAllCommentsForRecipe(this.recipeId);

      },
       error => { throwError(error); }

    )
  }

  getAllCommentsForRecipe(recipeId : number){
    this.commentService.getAllCommentsForRecipe(recipeId).subscribe(
      data => {
        this.comments=data;
      }
    )
  }
}
