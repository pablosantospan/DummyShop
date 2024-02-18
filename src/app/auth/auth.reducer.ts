import { createReducer, on } from "@ngrx/store";
import { loginSuccess } from "./auth.actions";


export interface AuthState {
    token: string;
}

export const initialState: AuthState = {
    token: ''
}

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { token }) => ({ ...state, token }))
)