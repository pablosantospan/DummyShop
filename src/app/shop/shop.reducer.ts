import { createReducer, on } from "@ngrx/store";
import { resetFavoriteProducts, setFavoriteProducts, setListOfProducts, toggleFavoriteProduct } from "./shop.actions";
import { Product } from "../models/Product.inteface";

export interface ShopState {
    productList: Product[];
    favoriteProducts: Product[];
}

export const initialState: ShopState = {
    productList: [],
    favoriteProducts: []
}

export const shopReducer = createReducer(
    initialState,
    on(setListOfProducts, (state, { productList }) => ({ ...state, productList })),
    on(setFavoriteProducts, (state, { favoriteProducts }) => ({ ...state, favoriteProducts })),
    on(toggleFavoriteProduct, (state, { productId }) => ({
        ...state,
        productList: state.productList.map(prod => {
            if(prod.id === productId){
                return { ...prod, fav: !prod.fav };
            }
            return prod;
        })
    })),
    on(resetFavoriteProducts, state => ({
      ...state,
      favoriteProducts: []
    }))
)