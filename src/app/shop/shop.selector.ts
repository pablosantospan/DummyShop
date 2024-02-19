// auth.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ShopState } from './shop.reducer';

export const selectShopState = createFeatureSelector<ShopState>('shop');

export const selectShopProducts = createSelector(
    selectShopState,
  (state: ShopState) => state.productList
);

export const selectFavoriteProducts = createSelector(
  selectShopState,
  (state: ShopState) => state.favoriteProducts
);
