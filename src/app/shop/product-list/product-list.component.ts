import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/Product.inteface';
import { ShopService } from '../services/shop.service';
import { Subscription, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectShopProducts } from '../shop.selector';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements  OnDestroy {

  productList: Product[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private shopService: ShopService,
    private store: Store<{ shop: { products: Product[] }}>
  ){}

  ngAfterContentInit(): void {
    this.store.pipe(
      select(selectShopProducts),
      map(products => {
        this.productList =  products;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  
  markUnmarkFav(product: Product){
    this.productList = this.productList.map(prod => {
      if(product.id === prod.id){
        return { ...prod, fav: !prod.fav };
      }
      return prod;
    });
    this.shopService.setProductList(this.productList);
  }

}
