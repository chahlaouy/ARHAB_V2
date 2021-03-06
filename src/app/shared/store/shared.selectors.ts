import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";

export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoadingSpinnerState = createSelector(getSharedState, state => {
    
    return state.showLoadingSpinner;
});

export const getErrorMessages = createSelector(getSharedState, state => {

    return state.errorMessages;
})