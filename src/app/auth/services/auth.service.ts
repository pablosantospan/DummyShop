import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models/User.interface';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectAuthToken } from '../auth.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: Observable<string> = new Observable<string>();
  private token: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
    ) { }

  getToken(): string {
    return this.token;
  }

  setToken(token: string){
    this.token = token;
  }

  login(username: string, password: string): Observable<any> {
    const url = environment.loginUrl;
    const body = JSON.stringify({
      username,
      password
    });

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.post<User>(url, body, httpOptions);
  }

  isAuthenticatedUser() {
    return this.store.pipe(
      select(selectAuthToken),
      map(token => {
        if (token !== null && token.trim() !== '') {
          return true;
        } else {
          return this.router.createUrlTree(['']);
        }
      })
    );
  }

}
