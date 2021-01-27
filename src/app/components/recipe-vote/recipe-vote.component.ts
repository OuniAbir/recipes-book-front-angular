import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recipe } from 'src/app/common/recipe';
import { VotePayload } from 'src/app/common/vote-payload';
import { RecipeService } from 'src/app/services/recipe.service';
import { VoteService } from 'src/app/services/vote.service';
import { VoteType } from 'src/app/common/vote-type';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-recipe-vote',
  templateUrl: './recipe-vote.component.html',
  styleUrls: ['./recipe-vote.component.css']
})
export class RecipeVoteComponent implements OnInit {

  votePayload: VotePayload;
  recipeId : number;
  @Input() voteProps : { voteCount : number, upvote : boolean , downvote: boolean }
  constructor(private router : ActivatedRoute,
     private voteService : VoteService,
    private toastr: ToastrService,
    private recipeService : RecipeService,) {
      this.votePayload = {
        voteType: undefined,
        recipeId: undefined
      }
      const theRecipeId: number = +this.router.snapshot.paramMap.get('id');
      this.recipeId = theRecipeId;
    }

  ngOnInit(): void {
  this.updateVoteDetails();
  }


  upvotePost()
  {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.SendVote();
    this.voteProps.upvote = true  ;
    this.voteProps.downvote = false ;
  }

  downvotePost()
  {
    this.votePayload.voteType = VoteType.DOWNVOTE ;
    this.SendVote();
    this.voteProps.upvote = false ;
    this.voteProps.downvote = true  ;
  }

  SendVote(){
    this.votePayload.recipeId = this.recipeId ;
    this.voteService.vote(this.votePayload).subscribe(
      success => { this.updateVoteDetails(); },
      err => {
        this.toastr.error(err.error.message);
        throwError(err);}
    )
  }

  updateVoteDetails(){
    this.recipeService.getRecipeById(this.recipeId).subscribe(

      data => {
        this.voteProps.voteCount = data.voteCount ;
      }
    )
  }
}
