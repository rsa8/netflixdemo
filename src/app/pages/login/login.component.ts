import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  public user: any;
  constructor(
    public authService: AuthService,
    public router: Router) {
  }
  error = '';
  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });
  }

  public login() {
    if(this.loginForm.valid) {
        const user = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
        }
        this.authService.login(user);
      } else {
        this.error =  'Please enter credential';
      }
  }

  private validateUser() {
    return this.user.email != '' || this.user.password != '';
  }


}
