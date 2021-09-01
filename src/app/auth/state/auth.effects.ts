import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { loginStart, loginSuccess, registerStart, registerSuccess } from "./auth.actions";
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { setErrorMessages, setLoadingSpinner } from "src/app/shared/store/shared.actions";
import { AppState } from "src/app/state/app.state";
import { Store } from "@ngrx/store";
import { ResponseJwt } from "src/app/models/response-jwt.model";
import { User } from "src/app/models/user.model";
import { AuthenticatedUser } from "src/app/models/authenticated-user.model";
import { of } from "rxjs";
import { Router } from "@angular/router";


@Injectable()
export class AuthEffect{

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router
    ){}

    $login = createEffect(()=> {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password).pipe(
                    map((responseJwt) => {
                        this.store.dispatch(setLoadingSpinner({status: false}));
                        const authenticatedUser = this.formatResponse(responseJwt);
                        return loginSuccess({authenticatedUser})
                    })
                )
            }), catchError(errorResponse => {
                this.store.dispatch(setLoadingSpinner({status: false}));
                return of(setErrorMessages({errorMessages: errorResponse.error}));
            })
        )
    });

    $register = createEffect(() => {
        return this.actions$.pipe(
            ofType(registerStart),
            exhaustMap((action) => {
                console.log("here simple");
                return this.authService.register(action.username, action.email, action.password).pipe(
                    map((responseJwt) => {
                        this.store.dispatch(setLoadingSpinner({status: false}));
                        const authenticatedUser = this.formatResponse(responseJwt);
                        return registerSuccess({authenticatedUser});
                    })
                )
            }), catchError(errorResponse => {
                console.log("here error");
                this.store.dispatch(setLoadingSpinner({status: false}));
                return of(setErrorMessages({errorMessages: errorResponse.error}));
            })
        )
    });

    registerRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(registerSuccess),
            map((action) => {
                this.router.navigate(['/']);
            })
        )
    }, {dispatch: false});

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginSuccess),
            map((action) => {
                this.router.navigate(['/']);
            })
        )
    }, {dispatch: false});

    formatResponse(responseJwt: ResponseJwt){
        const user = new User(
            responseJwt.user.id,
            responseJwt.user.username,
            responseJwt.user.email,
            responseJwt.user.age,
            responseJwt.user.gender,
            responseJwt.user.phone,
            responseJwt.user.email_verified_at,
            responseJwt.user.created_at,
            responseJwt.user.updated_at,
            responseJwt.user.user_role
        );
        const expiresIn = new Date( new Date().getTime() + +responseJwt.expires_in * 1000);
        
        const authUser: AuthenticatedUser = {
            user: user,
            token: responseJwt.access_token,
            tokenType: responseJwt.token_type,
            expiresIn: expiresIn
        }
        return authUser
    }
}