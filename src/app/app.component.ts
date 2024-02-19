import { Component, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  isAuthenticated: boolean = false;

  constructor(){
    inject(AuthService).isToken().subscribe(res => {
      this.isAuthenticated = res;
    });
  }

}
