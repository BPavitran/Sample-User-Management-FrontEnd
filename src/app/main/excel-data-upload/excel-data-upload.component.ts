import { UserType } from './../../common/user-type';
import { UserService } from 'src/app/services/user.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as XLSX from 'xlsx';
import { User } from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelUser, ActuallUser, ExcelUserType } from './excel-user';
import { ExcelUserUploadType } from 'src/app/common/excel-user-upload-type';
import { SnackBar } from 'src/app/common/snackbar';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  uploadtype: ExcelUserUploadType;
}

@Component({
  selector: 'app-excel-data-upload',
  templateUrl: './excel-data-upload.component.html',
  styleUrls: ['./excel-data-upload.component.scss']
})

export class ExcelDataUploadComponent implements OnInit {

  users = [];

  searchName;

  displayedColumns: string[] = ['name', 'email', 'userType'];
  dataSource = new MatTableDataSource<any>(this.users);

  uploadType;
  ExcelUserUploadType = ExcelUserUploadType;

  loading = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.uploadType = this.data.uploadtype;
  }

  fileChangeEvent(event){
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {

      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws);

      const modifiedData = this.dataSetupForTable(data);

      this.users = modifiedData;

      this.dataSource = new MatTableDataSource<any>(modifiedData);
      this.dataSource.paginator = this.paginator;
    };
  }

  dataSetupForTable(data) {
    const modifiedData = data.map(param => {
      const newParam = {};
      if(param[ExcelUser.FIRST_NAME]){
        newParam[ActuallUser.FIRST_NAME] = param[ExcelUser.FIRST_NAME];
      }

      if(param[ExcelUser.LAST_NAME]){
        newParam[ActuallUser.LAST_NAME] = param[ExcelUser.LAST_NAME];
      }

      if(param[ExcelUser.USER_TYPE]){
        switch(param[ExcelUser.USER_TYPE]) {
          case ExcelUserType.ADMIN :
            newParam[ActuallUser.USER_TYPE] = UserType.ADMIN;
            break;
          case ExcelUserType.MANAGER :
            newParam[ActuallUser.USER_TYPE] = UserType.MANAGER;
            break;
          case ExcelUserType.TEAM_LEADER :
            newParam[ActuallUser.USER_TYPE] = UserType.TEAM_LEADER;
            break;
          case ExcelUserType.AGENT :
            newParam[ActuallUser.USER_TYPE] = UserType.AGENT;
            break;
        }
      }

      if(param[ExcelUser.EMAIL]){
        newParam[ActuallUser.EMAIL] = param[ExcelUser.EMAIL];
      }

      if(param[ExcelUser.AGE]){
        newParam[ActuallUser.AGE] = param[ExcelUser.AGE];
      }

      if(param[ExcelUser.ADDRESS]){
        newParam[ActuallUser.ADDRESS] = param[ExcelUser.ADDRESS];
      }

      return newParam;
    })

    return modifiedData;
  }

  createUsers() {
    this.loading = true;
    this.userService.createBulkUsers(this.users).subscribe(res => {
      this.loading = false;
      if(res.success){
        new SnackBar().openSnackBar(this._snackBar, 'Create Success', 'OK', 5000, 'green-500');
      } else {
        new SnackBar().openSnackBar(this._snackBar, res.message, 'OK', 5000, 'warn');
      }
    })
  }

  updateUsers() {
    this.loading = true;
    this.userService.updateBulkUsers(this.users).subscribe(res => {
      this.loading = false;
      if(res.success){
        new SnackBar().openSnackBar(this._snackBar, 'Update Success', 'OK', 5000, 'green-500');
      } else {
        new SnackBar().openSnackBar(this._snackBar, res.message, 'OK', 5000, 'warn');
      }
    })
  }

}
