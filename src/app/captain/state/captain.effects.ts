import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators'
import { setErrorMessages, setLoadingSpinner } from "src/app/shared/store/shared.actions";
import { AppState } from "src/app/state/app.state";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { addCarStart, getCarsStart, getCarsSuccess } from "./captain.actions";
import { CarsService } from "../services/cars.service";


@Injectable()
export class CaptainEffect{

    constructor(
        private actions$: Actions,
        private carsService: CarsService,
        private store: Store<AppState>,
        private router: Router
    ){}

    $addCar = createEffect(()=> {
        return this.actions$.pipe(
            ofType(addCarStart),
            exhaustMap((action) => {
                return this.carsService.persistCar(action.car).pipe(
                    map((data) => {
                        console.log(data)
                        return getCarsStart();
                    })
                )
            }), catchError(errorResponse => {
                this.store.dispatch(setLoadingSpinner({status: false}));
                return of(setErrorMessages({errorMessages: errorResponse.error}));
            })
        )
    });

    $getCars = createEffect(()=> {
        return this.actions$.pipe(
            ofType(addCarStart),
            exhaustMap((action) => {
                return this.carsService.getAllCars().pipe(
                    map((cars) => {
                        console.log(cars);
                        return getCarsSuccess({cars});
                    })
                )
            }), catchError(errorResponse => {
                this.store.dispatch(setLoadingSpinner({status: false}));
                return of(setErrorMessages({errorMessages: errorResponse.error}));
            })
        )
    });


    

    // $autoLogin = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(autoLogin),
    //         mergeMap(action => {
    //             const authenticatedUser = this.authService.getAuthenticatedUserFromLocalStorage();
    //             return of(loginSuccess({authenticatedUser}));
    //         })
    //     )
    // })
    // registerRedirect$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(registerSuccess),
    //         map((action) => {
    //             this.router.navigate(['/']);
    //         })
    //     )
    // }, {dispatch: false});

    // loginRedirect$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(loginSuccess),
    //         map((action) => {
    //             this.router.navigate(['/']);
    //         })
    //     )
    // }, {dispatch: false});

    
}