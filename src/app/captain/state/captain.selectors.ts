import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CaptainState } from "./captain.state";

export const CAPTAIN_STATE_NAME = "captain";

const getCaptainState = createFeatureSelector<CaptainState>(CAPTAIN_STATE_NAME);

export const getCaptainCars = createSelector(getCaptainState, state => {
    return state.cars;
});