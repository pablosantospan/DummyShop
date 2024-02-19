import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';
import { ProductListComponent } from './product-list/product-list.component';



@NgModule({
  declarations: [
    MainComponent,
    FavoritesComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
