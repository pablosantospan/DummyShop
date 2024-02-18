import { Component } from '@angular/core';
import { Product } from '../../models/Product.inteface';
import { Store, select } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { selectShopProducts } from '../shop.selector';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

  subscription: Subscription = new Subscription();
  favoriteProducts: Product[] = [];

  constructor(
    private store: Store<{shop: { productList: Product[] }}>
  ){
    this.getFavoriteProducts();
  }

  getFavoriteProducts(){
    this.subscription = this.store.pipe(
      select(selectShopProducts)
    ).subscribe(products => {
      this.favoriteProducts = products.filter(prod => prod.fav)
    });
  }

}
