import { MapsAPILoader } from '@agm/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RidesService {


  corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': environment.BACK_END_URL
  });
  constructor(
    private http: HttpClient,
  ) { }


  addRide(ride: any){
    console.log(ride);
    return;
    return this.http.post<any>(`${environment.BACK_END_URL_API}/rides`, {
      ride
    }, {
        headers: this.corsHeaders
    });
  }



}
