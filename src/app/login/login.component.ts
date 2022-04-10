import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {LoginRequest} from "../models/LoginRequest";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  logIn(){

    let loginRequest : LoginRequest = {
      email : this.email.value,
      password : this.password.value
    };

    this.authService.logIn(loginRequest).subscribe(result => {
      if(result){
        this.router.navigate(['/course']);
      }
    });

  }

}
