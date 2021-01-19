import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import { RecipeService } from './services/recipe.service';
import { SearchComponent } from './components/search/search.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'category/:id' , component : RecipeListComponent },
  {path: 'catgeory' , component : RecipeListComponent },
  {path: 'recipes' , component : RecipeListComponent },
  { path: 'search/:keyword', component: RecipeListComponent },
  { path : '' , component : RecipeListComponent},
  { path : '**' , component : RecipeListComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    CategoryMenuComponent,
    SearchComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
