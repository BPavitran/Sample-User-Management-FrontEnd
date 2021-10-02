import { UserType } from './../../common/user-type';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { SnackBar } from '../../common/snackbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

let userServiceApi;
let userEmail;

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  updateForm: FormGroup;

  user: User;

  userTypeList: {}[];

  constructor(
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.updateForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email], validateEmail('email')],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userType: ['', Validators.required],
      age: [''],
      address: ['']
    });

    this.userTypeList = Object.values(UserType);

    userServiceApi = this.userService;

    const userId = this.route.snapshot.paramMap.get('id');

    this.userService.getUserById(userId).subscribe(user => {
      if(user){
        this.user = user;
        userEmail = user.email;
      }
    })
  }

  updateUser(): void {
    const password = this.updateForm.get('password').value;
    this.user.password = password;
    this.userService.updateUser(this.user).subscribe(res => {
      if(res.success){
        this.user = res.data;
        new SnackBar().openSnackBar(this._snackBar, 'Update Success', 'OK', 5000, 'green-500');
      } else {
        new SnackBar().openSnackBar(this._snackBar, res.message, 'OK', 5000, 'warn');
      }
    })
  }

}

export function validateEmail(emailType: string): ValidationErrors {
  return async (control: AbstractControl): Promise<{ [key: string]: boolean; } | null> => {
      if (!control.parent || !control) {
          return null;
      }
      const email = control.parent.get(emailType).value;

      if(email == userEmail) {
        return null;
      }

      const exists = await userServiceApi.getUserByEmail(control.parent.get(emailType).value).toPromise();
      console.log(exists)
      return exists ? {emailAlreadyUsed: true} : null;
  };
}
