import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { shopReducer } from './shop/shop.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({
      auth: authReducer,
      shop: shopReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
