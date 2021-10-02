import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { SnackBar } from 'src/app/common/snackbar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users : User[] = [];
  filteredUsers : User[] = [];

  searchName;

  displayedColumns: string[] = ['name', 'email', 'userType', 'edit', 'delete'];
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    })
  }

  getFilteredUser() {
    if(this.searchName){
      this.filteredUsers = this.users.filter(user => {
        const fullName = user.firstName + ' ' + user.lastName;
        if(fullName.includes(this.searchName) || user.firstName.includes(this.searchName) || user.lastName.includes(this.searchName)){
          return user;
        }
      });
      this.dataSource = new MatTableDataSource<User>(this.filteredUsers);
      this.dataSource.paginator = this.paginator;
    } else {
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    }
  }

  deleteUser(index : number){
    const userId = this.users[index].id;
    this.userService.deleteUser(userId).subscribe(res => {
      if(res.success){
        this.users.splice(index, 1);
        this.getFilteredUser();
        new SnackBar().openSnackBar(this._snackBar, 'Delete Success', 'OK', 5000, 'green-500');
      } else {
        new SnackBar().openSnackBar(this._snackBar, res.message, 'OK', 5000, 'warn');
      }
    })
  }

}
