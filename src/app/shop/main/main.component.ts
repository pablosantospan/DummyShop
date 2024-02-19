import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Product } from '../../models/Product.inteface';
import { Store, select } from '@ngrx/store';
import { setListOfProducts } from '../shop.actions';
import { selectShopProducts } from '../shop.selector';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss', '../../app.component.scss']
})
export class MainComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  productList: Product[] = [];

  constructor(
    private shopService: ShopService,
    private store: Store<{ shop: { products: Product[] }}>
    ){
  }

  ngOnInit(): void {
    this.store.pipe(
      takeUntil(this.destroy$),
      select(selectShopProducts)
    ).subscribe(products => {
      this.destroySubscriptions();
      if(products.length){
        this.productList = products
      } else{
        this.getProducts();
      }
    });
  }

  getProducts(){
    this.shopService.getProducts().subscribe((products) => {
      this.productList = products.map(prod => ({ ...prod, fav: false }));
      this.shopService.setProductList(this.productList);
    });
  }

  markUnmarkFav(prod: Product){
    this.productList = this.shopService.markUnmarkFav(prod, this.productList);
    const favoriteProducts = this.productList.filter(prod => prod.fav);
    this.shopService.setFavoriteList(favoriteProducts);
    this.shopService.setProductList(this.productList);
  }

  destroySubscriptions(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
