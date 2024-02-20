import { Component, HostListener, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Product } from '../../models/Product.inteface';
import { Store, select } from '@ngrx/store';
import { selectShopProducts } from '../shop.selector';
import { Subject, Subscription, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss', '../../app.component.scss']
})
export class MainComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  productList: Product[] = [];
  subscription: Subscription = new Subscription();

  index: number= 0;
  productsPerPage: number = 12;
  isLoading: boolean = false;
  totalLength: number = 0;

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

  // Get products successively while scrolling down the screen, due to list of products will grow considerably
  getProducts(){
    this.shopService.getProducts()
    .subscribe((products) => {
      this.totalLength = products.length;
      this.productList = [...this.productList, ...products.slice(this.index, this.index + this.productsPerPage).map(prod => ({ ...prod, fav: false }))];;
      this.index += this.productsPerPage;
      this.shopService.setProductList(this.productList);
      this.isLoading = false;
    });
  }

  // Called when user scroll down the screen to get next products
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const windowHeight = window.innerHeight;
    const windowScroll = window.scrollY;
    const documentHeight = document.body.offsetHeight;
    const contentHeight = windowHeight + windowScroll;

    if (!this.isLoading && this.index < this.totalLength && contentHeight >= documentHeight) {
      this.isLoading = true;
      this.getProducts();
    }
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
