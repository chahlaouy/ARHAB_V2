import { AuthenticatedUser } from "src/app/models/authenticated-user.model";
import { User } from "src/app/models/user.model";

export interface AuthState{
    authenticatedUser: AuthenticatedUser
}

export const initialState: AuthState = {
    authenticatedUser: null
}