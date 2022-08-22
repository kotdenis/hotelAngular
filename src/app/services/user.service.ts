import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { RegisterModel } from '../models/register';
import { LoginModel } from '../models/login';
import { TokenModel } from '../models/tokenModel';
import { USER_URL } from '../constants/appConstants';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginModel: LoginModel): Observable<TokenModel> {
    return this.httpClient.post<TokenModel>(USER_URL + 'signin', loginModel, this.httpOptions)
      .pipe(tap(_ => console.log('sign in')), map(x => this.setStorage(x)), catchError(this.handleError))
  }

  register(registerModel: RegisterModel): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(USER_URL + 'signup', registerModel, this.httpOptions)
      .pipe(map(x => {console.log('register ' + x.status); return x}), catchError(this.handleError));
  }

  logout(): Observable<HttpResponse<any>> {
    const accessToken = this.getAccessToken();
    if(this.isTokenExpired){
      this.refreshToken().subscribe();
      console.log('logout expired ' + accessToken);
    }
    const params = new HttpParams().set('accessToken', accessToken);
    return this.httpClient.post<HttpResponse<any>>(USER_URL + 'logout?' + params, null, {observe: 'response'})
      .pipe(map(x => {localStorage.clear(); console.log('logout status ' + x.status); return x}), 
      catchError(this.handleError));
  }

  refreshToken():Observable<TokenModel> {
    const accessToken = this.getAccessToken();
    const params = new HttpParams().set('token', accessToken);
    return this.httpClient.post<TokenModel>(USER_URL + 'token-refresh?' + params, null, this.httpOptions)
      .pipe(tap(_ => console.log('refresh token')), map(x => this.setStorage(x)), catchError(this.handleError))
  }

  getAccessToken(): string {
    return localStorage.getItem('accessToken')!;
  }

  getRefreshToken():string {
    return localStorage.getItem('refreshToken')!;
  }

  getUserRole(): string {
    const token = localStorage.getItem('accessToken')!;
    if(token){
      let decoded = this.jwtHelper.decodeToken(token);
      return decoded.family_name;
    }
    return '';
  }

  get isTokenExpired(): boolean {
    let authToken = localStorage.getItem('accessToken');
    return this.jwtHelper.isTokenExpired(authToken!);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('accessToken');
    let isLogged = authToken !== null ? true : false;
    console.log('isLoggedIn ' + ' ' + isLogged + ' ' + authToken);
    return isLogged;
  }

  private handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => msg);
  }

  private setStorage(tokenModel: TokenModel): TokenModel {
    localStorage.clear();
    localStorage.setItem('accessToken', tokenModel.accessToken);
    localStorage.setItem('refreshToken', tokenModel.refreshToken);
    localStorage.setItem('userName', tokenModel.userName);
    return tokenModel;
  }
}
