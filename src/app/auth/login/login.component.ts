import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequestPayload } from './login-request-payload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup : FormGroup ;
  loginRequestPayload : LoginRequestPayload ;

  registrationSuccessMessage : string = '';
  isError : boolean ;

  constructor(private AuthService  : AuthService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private toastrService : ToastrService
    ) {
    this.loginRequestPayload = { username : '', password : ''  }

  }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      username : new FormControl('', Validators.required) ,
      password : new FormControl ('', Validators.required)
    })

    /* check if we come from signup page, if yes show a signup ssuccess message */
    this.activatedRoute.queryParams.subscribe(
      Param => {
        if (Param.registered  !== undefined && Param.registered=='true' ) {
          this.toastrService.success('Signup Successfull');
          this.registrationSuccessMessage='Please Check your inbox for activation email then activate your account before you Login!';
        }
      }
    )

  }

  login(){
   /* asign value from form to loginrequest*/
    this.loginRequestPayload.password = this.loginFormGroup.get('password').value ;
    this.loginRequestPayload.username = this.loginFormGroup.get('username').value ;

    console.log(`${this.loginRequestPayload}`);

    /* send login request */
    this.AuthService.login(this.loginRequestPayload).subscribe(
      data =>
      {
        /* login success -> we get true from authservice */
        /* if true go to start page*/
        if (data) {
          console.log(`login return : ${data}`);
          this.isError = false ;
          /* Navigates to this absolute route path */
          this.router.navigateByUrl('/');
          this.toastrService.success('Login Successful');
        }
        /* login failed */
        else {

          this.isError=true;
          this.toastrService.error('Login failed !');
        }
      }
    ) ;
  }

}
