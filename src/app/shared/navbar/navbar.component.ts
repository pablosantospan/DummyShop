import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { Product } from '../../models/Product.inteface';
import { ShopService } from '../../shop/services/shop.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private shopService: ShopService,
    private store: Store<{shop: { productList: Product[] }}>
  ){}

  logout(){
    this.shopService.logout();
    this.authService.logout();
  }

}
