import { createReducer, on } from "@ngrx/store";
import { setErrorMessages, setLoadingSpinner } from "./shared.actions";
import { initialState } from "./shared.state";

const _sharedReducer = createReducer(initialState, on(
    setLoadingSpinner, (state, action) => {
        return {
            ...state,
            showLoadingSpinner: action.status
        }
    }),
    on(setErrorMessages, (state, action) => {
        return {
            ...state,
            errorMessages: action.errorMessages
        }
    })
)

export function SharedReducer(state, action){

    return _sharedReducer(state, action);
}