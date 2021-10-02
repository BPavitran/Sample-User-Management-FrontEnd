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
export class AuthService {

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

}
