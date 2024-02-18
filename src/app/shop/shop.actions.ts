import { createAction, props } from '@ngrx/store';
import { Product } from '../models/Product.inteface';

export const setListOfProducts = createAction('List of products', props<{ productList: Product[] }>());