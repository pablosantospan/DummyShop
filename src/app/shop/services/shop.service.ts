import { Injectable } from '@angular/core';
import { Product } from '../../models/Product.inteface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { resetFavoriteProducts, resetProducts, setFavoriteProducts, setListOfProducts } from '../shop.actions';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  productList: Product[] = [];
  _list: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.productList);

  constructor(
    private http: HttpClient,
    private store: Store<{shop: { productList: Product[] }}>
  ) { }

  get _productList(){
    return this._list.asObservable();
  }

  // get products from server
  getProducts(): Observable<Product[]>{
    const url = environment.productsUrl;
    return this.http.get<any>(url).pipe(
      map(response => response.products)
    );
  }

  updateProduct(product: Product): Observable<Product>{
    const url = `${environment.productsUrl}/${product.id}`;
    const body = JSON.stringify({
      title: product.title
    });

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put<Product>(url, body, httpOptions);
  }

  deleteProduct(product: Product): Observable<Product>{
    const url = `${environment.productsUrl}/${product.id}`;
    return this.http.delete<Product>(url);
  }
  
  setProductList(productList: Product[]){
    this.store.dispatch(setListOfProducts({ productList }));
  }

  setFavoriteList(favoriteProducts: Product[]){
    this.store.dispatch(setFavoriteProducts({ favoriteProducts }));
  }

  markUnmarkFav(product: Product, productList: Product[]): Product[]{
    productList = productList.map(prod => {
      if(product.id === prod.id){
        return { ...prod, fav: !prod.fav };
      }
      return prod;
    });
    return productList;
  }

  logout(){
    this.store.dispatch(resetFavoriteProducts());
    this.store.dispatch(resetProducts());
  }
}
