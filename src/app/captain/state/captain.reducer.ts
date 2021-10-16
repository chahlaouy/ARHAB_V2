import { createReducer, on } from "@ngrx/store";
import { initialState } from "./captain.state";

import { getCarsSuccess } from './captain.actions';

export const _captainReducer = createReducer(initialState, 
    on(getCarsSuccess, (state, action) => {
        return {
            ...state,
            cars: action.cars
        }
    })
    );

export function CaptainReducer(state, action){

    return _captainReducer(state, action);
}