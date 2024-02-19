import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models/User.interface';
import { Router, UrlTree } from '@angular/router';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectAuthToken } from '../auth.selector';
import { resetToken } from '../auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  destroy$: Subject<boolean> = new Subject<boolean>();
  private token: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<{auth: { token: string }}>
    ) { }

  getToken(): string {
    return this.token;
  }

  setToken(token: string): void{
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

  isAuthenticatedUser(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      takeUntil(this.destroy$),
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

  isToken(): Observable<boolean>{
    return this.store.pipe(
      takeUntil(this.destroy$),
      select(selectAuthToken),
      map(token => {
        return (token !== null && token.trim() !== '');
      })
    );
  }

  logout(): void{
    this.store.dispatch(resetToken());
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void{
    this.destroySubscriptions();
  }

  destroySubscriptions(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
