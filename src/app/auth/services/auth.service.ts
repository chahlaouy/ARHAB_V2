import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class AuthService{

    corsHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8888/'
      });
    constructor(
        private http: HttpClient
    ){}

    
    login(email, password){

        return this.http.post<any>(`${environment.BACK_END_URL}/auth/login`, {
            email,
            password
        }, {
            headers: this.corsHeaders
        })
    }

    register(username, email, password){

        return this.http.post<any>(`${environment.BACK_END_URL}/auth/register`, {
            username,
            email,
            password
        })
    }

}