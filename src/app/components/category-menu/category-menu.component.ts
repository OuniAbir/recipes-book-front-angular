import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeCategory } from 'src/app/common/recipe-category';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {

  categories: RecipeCategory[];
  isLoggedIn: boolean = false;
  username: string;

  constructor(private recipeService: RecipeService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

    /* subscribe to loggin status change */
    this.authService.loggedIn.subscribe((data: boolean) => { this.isLoggedIn = data; });
    this.authService.username.subscribe((data: string) => { this.username = data });
    /* get Loggin status*/
    this.authService.isLoggedIn();


    this.recipeService.getAllRecipeCategory().subscribe(
      data => {
        this.categories = data;
      }
    );

  }

  logout() {
    /* clear local storage , go to start page */
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}
