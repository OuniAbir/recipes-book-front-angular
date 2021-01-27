import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated : boolean;
  constructor(private AuthService : AuthService,
              private router : Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.AuthService.loggedIn.subscribe((data: boolean) => { this.isAuthenticated = data; });
    this.AuthService.isLoggedIn();

    if (this.isAuthenticated) {
      return true ;

    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
