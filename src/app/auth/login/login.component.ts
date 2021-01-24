import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequestPayload } from './login-request-payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup : FormGroup ;
  loginRequestPayload : LoginRequestPayload ;

  constructor(private AuthService  : AuthService) {
    this.loginRequestPayload = { username : '', password : ''  }

  }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      username : new FormControl('', Validators.required) ,
      password : new FormControl ('', Validators.required)
    })
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
        console.log(`login return : ${data}`);

      }
    ) ;
  }

}
