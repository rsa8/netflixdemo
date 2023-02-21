import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: any;
  constructor(public authService: AuthService, public router: Router,  private notificationService: NotificationService,) {
    this.user = {
      email: '',
      password: ''
    }
  }
  registerForm!: FormGroup;
  error = '';

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });
  }

  public register() {
    if(this.registerForm.valid) {
      const user = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      }
     // console.log(user);
      this.authService.register(user);
    } else {
      this.error =  'Please enter credential';
    }
  }

    private validateUser() {
        return this.user.email != '' || this.user.password != '';
    }
}
