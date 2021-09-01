import { createReducer, on } from "@ngrx/store";
import { loginSuccess, registerSuccess } from "./auth.actions";
import { initialState } from "./auth.state";

export const _authReducer = createReducer(initialState, 
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            authenticatedUser: action.authenticatedUser
        }
    }),
    on(registerSuccess, (state, action) => {
        return {
            ...state,
            authenticatedUser: action.authenticatedUser
        }
    })
    );

export function AuthReducer(state, action){

    return _authReducer(state, action);
}