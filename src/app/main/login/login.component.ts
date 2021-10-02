import { UserType } from './../../common/user-type';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {SnackBar} from '../../common/snackbar';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  logIn(): void {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService.login(email, password).subscribe(res => {
      if (res.success) {
        const user = this.authService.getCurrentUser();
          if(user && user.userType == UserType.ADMIN){
          this.router.navigateByUrl('/users');
        }
        new SnackBar().openSnackBar(this._snackBar, 'Login Success', 'OK', 5000, 'green-500');
      } else {
        new SnackBar().openSnackBar(this._snackBar, res.error, 'OK', 5000, 'warn');
      }
    });
  }
}
