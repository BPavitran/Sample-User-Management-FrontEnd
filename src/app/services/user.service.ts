import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Response} from '../models/response';
import {Util} from '../common/util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;

  constructor(
    private httpClient: HttpClient
  ) { }

  login(email: string, password: string): Observable<Response<string>> {
    const url = Util.apiUrl('login');
    return this.httpClient.post<Response<any>>(url, {email, password}).pipe(map(res => {
        if(res.success){
          this.user = res.data;
        }
        return res;
    }), catchError((err, caught) => {
        console.log(err);
        return of({success: false, message: err.toString(), data: null});
    }));
  }

  public logout(): void {
    this.user = null;
  }

  getCurrentUser() {
    return this.user;
  }

  getAllUsers() {
    const url = Util.apiUrl('users');
    return this.httpClient.get<Response<User[]>>(url).pipe(map(res => res.data))
  }

  getUserById(userId : string) {
    const url = Util.apiUrl('user/' + userId);
    return this.httpClient.get<Response<User>>(url).pipe(map(res => res.data))
  }

  getUserByEmail(userEmail : string) {
    const url = Util.apiUrl('user-by-email/' + userEmail);
    return this.httpClient.get<Response<User>>(url).pipe(map(res => res.data))
  }

  createUser(userData : User) {
    const url = Util.apiUrl('create/user');
    return this.httpClient.post<Response<User>>(url, {userData}).pipe(map(res => res));
  }

  updateUser(userData : User) {
    const url = Util.apiUrl('update/user');
    return this.httpClient.post<Response<User>>(url, {userData}).pipe(map(res => {
      if(res.success){
        if(this.user.id == res.data.id){
          this.user = res.data;
        }
      }
      return res;
    }), catchError((err, caught) => {
        console.log(err);
        return of({success: false, message: err.toString(), data: null});
    }));
  }

  deleteUser(userId : string) {
    const url = Util.apiUrl('delete/user');
    return this.httpClient.post<Response<User>>(url, {userId}).pipe(map(res => res));
  }

  createBulkUsers(usersData : User[]) {
    const url = Util.apiUrl('create-bulk/user');
    return this.httpClient.post<Response<User[]>>(url, {usersData}).pipe(map(res => res));
  }

  updateBulkUsers(usersData : User[]) {
    const url = Util.apiUrl('update-bulk/user');
    return this.httpClient.post<Response<User[]>>(url, {usersData}).pipe(map(res => res));
  }
}
