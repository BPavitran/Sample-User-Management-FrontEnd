import { UserType } from './../../common/user-type';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { SnackBar } from '../../common/snackbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';

let userServiceApi;

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  createForm: FormGroup;

  user: User;

  userTypeList: {}[];

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.createForm = this._formBuilder.group({
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
  }

  createUser() {
    const email = this.createForm.get('email').value;
    const password = this.createForm.get('password').value;
    const firstName = this.createForm.get('firstName').value;
    const lastName = this.createForm.get('lastName').value;
    const userType = this.createForm.get('userType').value;
    const age = this.createForm.get('age').value;
    const address = this.createForm.get('address').value;
    this.user = {
      email : email,
      password : password,
      firstName : firstName,
      lastName : lastName,
      userType : userType,
      age : age,
      address : address
    };
    this.userService.createUser(this.user).subscribe(res => {
      if(res.success){
        this.user = null;
        this.createForm.reset();

        new SnackBar().openSnackBar(this._snackBar, 'Create Success', 'OK', 5000, 'green-500');
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

      const exists = await userServiceApi.getUserByEmail(control.parent.get(emailType).value).toPromise();
      console.log(exists)
      return exists ? {emailAlreadyUsed: true} : null;
  };
}
