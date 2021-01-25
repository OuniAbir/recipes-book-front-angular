import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxWebstorageModule } from "ngx-webstorage";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import { RecipeService } from './services/recipe.service';
import { SearchComponent } from './components/search/search.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { EditorModule } from '@tinymce/tinymce-angular';
import { RecipeReviewComponent } from './components/recipe-review/recipe-review.component';
import { CommentService } from './services/comment.service';

const routes: Routes = [
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'category/:id', component: RecipeListComponent },
  { path: 'catgeory', component: RecipeListComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'search/:keyword', component: RecipeListComponent },
  { path: '', component: RecipeListComponent },
  { path: '**', component: RecipeListComponent },

]

@NgModule({
  declarations: [
    AppComponent,
    CategoryMenuComponent,
    SearchComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    SignupComponent,
    LoginComponent,
    RecipeReviewComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    EditorModule
  ],
  providers: [
    RecipeService,
    AuthService,
    CommentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
