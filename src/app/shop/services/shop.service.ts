import { Injectable } from '@angular/core';
import { Product } from '../../models/Product.inteface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  productList: Product[] = [];
  _list: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.productList);

  constructor(private http: HttpClient) { }

  get _productList(){
    return this._list.asObservable();
  }

  getProducts(): Observable<Product[]>{
    const url = environment.productsUrl;
    return this.http.get<any>(url).pipe(
      map(response => response.products)
    );
  }
}
