import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private store: Store<{auth: { token: string }}>
  ){
    this.authService.isToken().subscribe(res => {
      if(res) this.router.navigate(['shop/main'])
    });
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isInvalidField(fieldValue: string): boolean | null{
    const control = this.loginForm.get(fieldValue);
    return (control && control.touched && control.invalid);
  }

  // Call login function from authService with user-filled form parameters
  login(): void{
    this.loginForm.markAllAsTouched();
    this.loginForm.updateValueAndValidity();

    if(this.loginForm.valid){
      const user = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.login(user, password).subscribe((res) => {
        if(res && res.token){
          console.log(res.token);
          this.setToken(res.token);
          this.router.navigate(['shop/main']);
        }
      });
    }
  }

  setToken(token: string): void{
    this.store.dispatch(loginSuccess({ token }));
  }

}
