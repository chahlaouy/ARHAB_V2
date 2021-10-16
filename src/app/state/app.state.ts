import { AuthReducer } from "../auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../auth/state/auth.selectors";
import { AuthState } from "../auth/state/auth.state";
import { CaptainReducer } from "../captain/state/captain.reducer";
import { CAPTAIN_STATE_NAME } from "../captain/state/captain.selectors";
import { CaptainState } from "../captain/state/captain.state";
import { SharedReducer } from "../shared/store/shared.reducer";
import { SHARED_STATE_NAME } from "../shared/store/shared.selectors";
import { SharedState } from "../shared/store/shared.state";

export interface AppState{
   [SHARED_STATE_NAME]: SharedState,
   [AUTH_STATE_NAME]: AuthState,
}

export const AppReducer = {
    [SHARED_STATE_NAME]: SharedReducer,
    [AUTH_STATE_NAME]: AuthReducer,
}