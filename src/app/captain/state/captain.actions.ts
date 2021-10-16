import { createAction, props } from "@ngrx/store";

export const ADD_CAR_START = "[captain state] add car start";
export const ADD_CAR_SUCCESS = "[captain state] add car success";
export const ADD_CAR_FAIL = "[captain state] add car fail";

export const GET_CARS_START = "[captain state] get cars start";
export const GET_CARS_SUCCESS = "[captain state] get cars success";
export const GET_CARS_FAIL = "[captain state] get cars fail";

export const addCarStart = createAction(ADD_CAR_START, props<{car: any}>());
export const addCarSuccess = createAction(ADD_CAR_SUCCESS);

export const getCarsStart = createAction(GET_CARS_START);
export const getCarsSuccess = createAction(GET_CARS_SUCCESS, props<{cars: any}>());

export const getCars = createAction(GET_CARS_START);
