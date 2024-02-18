import { createReducer, on } from "@ngrx/store";
import { setListOfProducts } from "./shop.actions";
import { Product } from "../models/Product.inteface";

export interface ShopState {
    productList: Product[];
}

export const initialState: ShopState = {
    productList: []
}

export const shopReducer = createReducer(
    initialState,
    on(setListOfProducts, (state, { productList }) => ({ ...state, productList }))
)