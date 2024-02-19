import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/Product.inteface';
import { Store, select } from '@ngrx/store';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { selectFavoriteProducts } from '../shop.selector';
import { ShopService } from '../services/shop.service';
import { toggleFavoriteProduct } from '../shop.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss', '../../app.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  favoriteProducts: Product[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private shopService: ShopService,
    private store: Store<{shop: { productList: Product[] }}>
  ){}

  ngOnInit(): void {
    this.getFavoriteProducts();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  getFavoriteProducts(){
    this.subscription = this.store.pipe(
      takeUntil(this.destroy$),
      select(selectFavoriteProducts)
    ).subscribe(products => {
      this.favoriteProducts = products;
      this.destroy$.next(true);
    });
  }

  markUnmarkFav(prod: Product){
    this.favoriteProducts = this.shopService.markUnmarkFav(prod, this.favoriteProducts);
    this.shopService.setFavoriteList(this.favoriteProducts.filter(prod => prod.fav));
    const productId = prod.id;
    this.store.dispatch(toggleFavoriteProduct({ productId }));
  }

}
