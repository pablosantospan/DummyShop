import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { map, of } from 'rxjs';
import { Router } from '@angular/router';
import { resetToken } from '../auth.actions';

describe('AuthService', () => {
  let service: AuthService;
  let http: jasmine.SpyObj<HttpClient>;
  let store: jasmine.SpyObj<Store>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({})
      ],
      providers: [
        Store,
        Router
      ]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login', () => {
    const username = 'kminchelle';
    const password = '0lelplR';
    const expectedUrl = environment.loginUrl;
    const expectedBody = JSON.stringify({ username, password });
    const fakeResponse = { token: 'fakeToken' };

    spyOn(http, 'post').and.returnValue(of(fakeResponse));

    service.login(username, password).subscribe();
    expect(http.post).toHaveBeenCalledWith(expectedUrl, expectedBody, jasmine.any(Object));

  });

  it('should return true if token is valid', () => {
    spyOn(store, 'pipe').and.returnValue(of('token'));

    service.isAuthenticatedUser().subscribe(result => {
      expect(result).toBeDefined();
    });
  });

  it('should return token', () => {
    spyOn(store, 'pipe').and.returnValue(of('token'));

    service.isToken().subscribe(result => {
      expect(result).toBeDefined();
    });
  });

  it('logout', () => {
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    service.logout();

    expect(store.dispatch).toHaveBeenCalledWith(resetToken());

    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

});
