import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { autoLogin, loginStart, loginSuccess, registerStart, registerSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators'
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
                        const authenticatedUser = this.authService.formatResponse(responseJwt);
                        this.authService.persistUser(authenticatedUser);
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
                        const authenticatedUser = this.authService.formatResponse(responseJwt);
                        this.authService.persistUser(authenticatedUser);
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

    $autoLogin = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogin),
            mergeMap(action => {
                const authenticatedUser = this.authService.getAuthenticatedUserFromLocalStorage();
                return of(loginSuccess({authenticatedUser}));
            })
        )
    })
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

    
}