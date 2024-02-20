import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { ShopModule } from './shop/shop.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { authReducer } from './auth/auth.reducer';
import { shopReducer } from './shop/shop.reducer';
import { hydrationMetaReducer } from './auth/hydratation.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ShopModule,
    StoreModule.forRoot({
        auth: authReducer,
        shop: shopReducer
      }, {metaReducers: [hydrationMetaReducer]}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
