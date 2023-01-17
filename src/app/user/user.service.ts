import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable } from 'rxjs';
import { Registration } from '../model/registration';

const AUTH_API = 'http://localhost:8080/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  public tokenKey = 'access_token';

  constructor(private http: HttpClient, private router: Router) { }

  public getToken(){
    return sessionStorage.getItem(this.tokenKey);
  }

  loginUser(email: String, password: String): Observable<any>{
    return this.http.post<any>(`${AUTH_API}/login`, {"email": email, "password": password})
      .pipe(map(token => {
        if (token){
          sessionStorage.setItem(this.tokenKey, token.access_token)
        }
        return token;
    }))
  }

  registerUser(email: String, password: String): Observable<Registration>{
    return this.http.post<any>(`${AUTH_API}/register`, {"email": email, "password": password})
  }

  logoutUser(){
    return this.http.get<any>(`${AUTH_API}/logout`, {observe: 'response'})
      .subscribe((res) => {
        if (res.status == 200){{
          sessionStorage.removeItem(this.tokenKey);
        }}
      })
  }
}
