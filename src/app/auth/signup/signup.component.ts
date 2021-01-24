import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SignupRequestPayload } from './signup-request-payload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  SignUpFormGroup: FormGroup;
  signupRequestPayload : SignupRequestPayload;

  constructor( private authService : AuthService,
    private router : Router ,
    private toastrService : ToastrService) {
    //need to intialise value
    this.signupRequestPayload = {
      email : '',
      password : '',
      username:''
    };
  }

  ngOnInit(): void {
  // build the register form group
  this.SignUpFormGroup =new FormGroup({
    username : new FormControl('', Validators.required),
    password: new FormControl('',  Validators.required),
    email : new FormControl('', Validators.required)
  });


  }
  signup(){
    // read the value from SignUpFormGroup and asign the to signupRequestPayload
    this.signupRequestPayload.username = this.SignUpFormGroup.get('username').value ;
    this.signupRequestPayload.password = this.SignUpFormGroup.get('password').value ;
    this.signupRequestPayload.email = this.SignUpFormGroup.get('email').value ;
    this.authService.signup(this.signupRequestPayload).subscribe(
      /* if signup succes render to login page and set a query param to route /login?registered=true    */
      success => { this.router.navigate(['/login'], {queryParams:{registered : 'true'}}); },
      /* on error send a notif */
      error => {this.toastrService.error('Registration Failed! Please try again')}
    );
  }

}
