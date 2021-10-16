import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  corsHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': environment.BACK_END_URL
  });

  constructor(
    private http: HttpClient,
  ) { }

  persistCar(car: any): Observable<any>{

    console.log(car.entries())

    return this.http.post<any>(`${environment.BACK_END_URL_API}/cars`, {
      car
    }, {
        headers: this.corsHeaders
    });
  }

  getAllCars(): Observable<any>{

    return;
    return this.http.get<any>(`${environment.BACK_END_URL_API}/cars`);
  }
}
