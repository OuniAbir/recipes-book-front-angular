
export class Recipe {
  id : number;
  calories: number ;
  carbs: number ;
  categoryName : string ;
  cooktime: number ;
  fat: number ;
  fiber: number ;
  imageUrl : string ;
  ingredients : string[];
  instructions: string;
  name : string ;
  preptime : number ;
  protein: number ;
  satfat : number ;
  servings : number ;
  source : string ;
  sugar : number ;
  userName: number ;
  voteCount: number ;
  waittime : number ;

  /* for vote */
  upVote: boolean;
  downVote: boolean;
  commentCount : number;
}
