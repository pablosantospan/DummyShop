import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Product } from '../../models/Product.inteface';
import { Store, select } from '@ngrx/store';
import { setListOfProducts } from '../shop.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  productList: Product[] = [];

  constructor(
    private shopService: ShopService,
    private store: Store<{shop: { productList: Product[] }}>
    ){
  }

  ngOnInit(): void {
    this.shopService.getProducts().subscribe((products) => {
      this.productList = products.map(prod => ({ ...prod, fav: false }));
      this.setProductList(this.productList);
      console.log(this.productList);
    });
  }
  
  markUnmarkFav(product: Product){
    this.productList = this.productList.map(prod => {
      if(product.id === prod.id){
        return { ...prod, fav: !prod.fav };
      }
      return prod;
    });
    this.setProductList(this.productList);
  }

  setProductList(productList: Product[]){
    this.store.dispatch(setListOfProducts({ productList }));
  }

}
