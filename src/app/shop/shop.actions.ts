import { createAction, props } from '@ngrx/store';
import { Product } from '../models/Product.inteface';

export const setListOfProducts = createAction('List of products', props<{ productList: Product[] }>());

export const setFavoriteProducts = createAction('Favorite products', props<{ favoriteProducts: Product[] }>());

export const toggleFavoriteProduct = createAction('Update favorite products', props<{ productId: number }>());

export const resetFavoriteProducts = createAction('Reset favorite products');

export const resetProducts = createAction('Reset favorite products');