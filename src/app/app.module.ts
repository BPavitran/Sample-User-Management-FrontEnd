import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './main/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UsersComponent } from './main/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserUpdateComponent } from './main/user-update/user-update.component';
import { MatSelectModule } from '@angular/material/select';
import { UserCreateComponent } from './main/user-create/user-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ExcelDataUploadComponent } from './main/excel-data-upload/excel-data-upload.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'user-create',
    component: UserCreateComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'user-update/:id',
    component: UserUpdateComponent,
    //canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    UserUpdateComponent,
    UserCreateComponent,
    ExcelDataUploadComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressBarModule,

    RouterModule.forRoot(appRoutes),
    HttpClientModule,

  ],
  entryComponents: [
    ExcelDataUploadComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
