import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginResponse } from '../auth/login/login-response';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  /* In backend every request is intercepted , to check the authorization header
      expecting JWT in authorization Header which contains a value according to the Bearer scheme */

  /* Every request from our front angular to backend should contain this token
     it'is possible by implementing the component HttpInterceptor similar to servlet interceptor in java
     by adding the JWt in every request. */

  /* when we send request with expired JWt we receive a 403 Forbidden respone, means we should refresh the token
     it's also possible to refresh the JWT in this interceptor and send the new JWT in auth headerfor the subsequent request */


  isTokenRefreshing = false ; /* the token refresh process has not already started */
  /*  to queue all requests to the backend an keep them in hold until our Token Refresh process is completed*/
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null) ;

  constructor(private authService: AuthService) { }

     /**
     * Identifies and handles a given HTTP request.
     * @param req The outgoing request object to handle.
     * @param next The next interceptor in the chain, or the backend
     * if no interceptors remain in the chain.
     * returns An observable of the event stream.
     */

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* first get the JWt from header */
    const jwtToken = this.authService.getauthenticationToken();
    const Req =  req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Access-Control-Allow-Origin':'*',
      },
    });

    console.log('intercept ', Req);

    if (jwtToken)  /* JWt is valid , just add to the header */
    {
       console.log('Intercepted HTTP call tocken IS VALID  ');
        return next.handle(this.addTokenToAuthHeader(Req , jwtToken));
    }
    else {
    /* jwt not valid,  next interceptor role to check the type of error we r getting
      if error of type 403 access Denied, so we need to make front make a call to get new JWT
    */
     console.log('Intercepted HTTP call tocken is null or NOT VALID !!!');

    return next.handle(Req)
    .pipe(catchError( err => {
      console.log("Intercepteur error :", err);

      if (err instanceof HttpErrorResponse && err.status === 403 ) {
        console.log('Intercepted HTTP call tocken NOT VALID and 403 ERROR !!!');
        /* front make a call to get new JWT*/

        return this.handleAuthAccessDeniedErrors(Req, next) ;

      } else {
        /* error is not of type Access Denied */
        return throwError(err);
      }

    })); }


  }

  handleAuthAccessDeniedErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.isTokenRefreshing == false){
      /* Now the token refresh process start */
      console.log('handleAuthAccessDeniedErrors : start refresh token process', req);
      this.isTokenRefreshing = true;
      /* once we receive the response we pass the JWT as the value for our refreshTokenSubject*/
      this.refreshTokenSubject.next(null);
      /* send refresh token request to backend*/
      return this.authService.refreshToken() /* get LoginResponse with new JWT */
      .pipe(
        switchMap( (refreshtokenResponse : LoginResponse) => {
          this.isTokenRefreshing=false ;
          this.refreshTokenSubject.next(refreshtokenResponse.authenticationToken);
          /* add the JWT to header and handle ur http request */
          console.log('handleAuthAccessDeniedErrors : handle request ', req);
          return next.handle(this.addTokenToAuthHeader(req, refreshtokenResponse.refreshToken));
        } )
      );
    }

  }

  addTokenToAuthHeader(req: HttpRequest<any>, jwt : string) :  HttpRequest<any>{
    const authReq =  req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${jwt}`,
        'Access-Control-Allow-Origin':'*',

      },
    });

    console.log('addTokenToAuthHeader ', authReq);
    return authReq ;
  }
}
