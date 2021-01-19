import { Ingredient } from "./ingredient";
import { RecipeCategory } from "./recipe-category";

export class Recipe {

  id : number ;
  name : String ;
  source : String;
  preptime:number ;
  cooktime:number ;
  servings : number ;
  calories : number ;
  comments: String ;
  instructions: String ;
  difficulty: String ;
  imageUrl: String ;
  category : RecipeCategory ;
  ingredients : Ingredient[] ;

}
