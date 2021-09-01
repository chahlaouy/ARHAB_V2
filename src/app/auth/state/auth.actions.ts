import { createAction, props } from "@ngrx/store";
import { AuthenticatedUser } from "src/app/models/authenticated-user.model";

export const LOGIN_START = "[auth page] login start";
export const LOGIN_SUCCESS = "[auth page] login success";
export const LOGIN_FAIL = "[auth page] login fail";

export const loginStart = createAction(LOGIN_START, props<{email: string, password: string}>());
export const loginSuccess = createAction(LOGIN_SUCCESS ,
    props<{ authenticatedUser: AuthenticatedUser }>()
    );
export const loginFail = createAction(LOGIN_FAIL);

export const REGISTER_START = "[auth page] register start";
export const REGISTER_SUCCESS = "[auth page] register success";
export const REGISTER_FAIL = "[auth page] register fail";

export const registerStart = createAction(REGISTER_START, props<
    {
        username: string, 
        email: string, 
        password: string
    }
    >());
export const registerSuccess = createAction(REGISTER_SUCCESS ,
    props<{ authenticatedUser: AuthenticatedUser }>()
    );
export const registerFail = createAction(REGISTER_FAIL);