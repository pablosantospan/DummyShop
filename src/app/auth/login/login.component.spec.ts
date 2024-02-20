import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        ReactiveFormsModule
      ],
      providers: [
        AuthService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    spyOn(authService, 'isToken').and.returnValue(of(false));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login', () => {
    component.loginForm.setValue({ username: 'name', password: 'pass' });
    const token = 'token';
    spyOn(authService, 'login').and.returnValue(of({ token }));
    spyOn(component, 'setToken').and.callThrough();
    component.login();
    expect(authService.login).toHaveBeenCalledWith('name', 'pass');
    expect(component.setToken).toHaveBeenCalled();
  })

});
