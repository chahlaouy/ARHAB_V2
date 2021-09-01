import { createAction, props } from "@ngrx/store";

export const SET_LOADING_SPINNER = '[shared state] loading spinner start';

export const SET_ERROR_MESSAGE = '[shared state] error message';

export const setLoadingSpinner = createAction(SET_LOADING_SPINNER, props<{status: boolean}>());

export const setErrorMessages = createAction(SET_ERROR_MESSAGE, props<{errorMessages: string[]}>());