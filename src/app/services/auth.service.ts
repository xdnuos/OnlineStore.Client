import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environment/environment';
import {
  ChangePassword,
  LoginUser,
  RegisterUser,
  UserRes,
} from '../store/model/User.model';
import { getHeaders } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseurl = `${environment.baseurl}`;
  constructor(private http: HttpClient, private message: NzMessageService) {}

  login(req: LoginUser): Observable<UserRes> {
    return this.http.post<UserRes>(this.baseurl + '/login', req).pipe(
      catchError((error) => {
        console.error('Error login:', error);
        return throwError(() => error);
      })
    );
  }

  register(req: RegisterUser): Observable<UserRes> {
    const url = this.baseurl + '/register';
    return this.http.post<UserRes>(url, req).pipe(
      catchError((error) => {
        console.error(`Error register:`, error);
        this.message.error(error.error.Message);
        return throwError(() => error);
      })
    );
  }

  //change password
  changePassword(req: ChangePassword): Observable<string> {
    const url = this.baseurl + '/change-password';
    const headers = getHeaders();
    return this.http.put<string>(url, req, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => error);
      })
    );
  }
  //forgot password

  //logout
}
