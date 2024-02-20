import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ShopService } from '../services/shop.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let store: jasmine.SpyObj<Store>;
  let shopService: jasmine.SpyObj<ShopService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({})
      ],
      providers: [
        Store,
        ShopService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    shopService = TestBed.inject(ShopService) as jasmine.SpyObj<ShopService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on init', () => {
    spyOn(store, 'pipe').and.returnValue(of([]));
    let subSpy = spyOn(store.pipe(), 'subscribe');
    component.ngOnInit();
    expect(subSpy).toHaveBeenCalled();
  });
  
  it('get products', () => {
    let products: any[] = [{
      id: 1
    }];
    spyOn(shopService, 'getProducts').and.returnValue(of(products));
    component.getProducts();
    expect(component.productList).toEqual(products.map(prod => ({...prod, fav: false})));
  });
  
  it('on scroll', () => {
    component.totalLength = 30;
    spyOn(component, 'getProducts').and.callThrough();
    component.onScroll();
    expect(component.getProducts).toHaveBeenCalled();
  });
  
  it('mar unmark favorites', () => {
    const product: any = {
      id: 1
    };
    spyOn(shopService, 'setFavoriteList').and.callThrough();
    spyOn(shopService, 'setProductList').and.callThrough();
    component.markUnmarkFav(product);
    expect(shopService.setFavoriteList).toHaveBeenCalled();
    expect(shopService.setProductList).toHaveBeenCalled();
  });
});
