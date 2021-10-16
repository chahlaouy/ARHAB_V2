import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticatedUser } from "src/app/models/authenticated-user.model";
import { ResponseJwt } from "src/app/models/response-jwt.model";
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class AuthService{

    corsHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': environment.BACK_END_URL
      });
    constructor(
        private http: HttpClient
    ){}

    
    login(email, password){

        return this.http.post<any>(`${environment.BACK_END_URL_API}/auth/login`, {
            email,
            password
        }, {
            headers: this.corsHeaders
        })
    }

    register(username, email, password){

        return this.http.post<any>(`${environment.BACK_END_URL_API}/auth/register`, {
            username,
            email,
            password
        })
    }

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
            responseJwt.user.user_role,
            responseJwt.user.is_activated
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

    persistUser(user: AuthenticatedUser){
        localStorage.setItem("authUser", JSON.stringify(user));
    }

    getAuthenticatedUserFromLocalStorage(){
        const authenticatedUserString = localStorage.getItem("authUser");

        if(authenticatedUserString){
            const authenticatedUserData = JSON.parse(authenticatedUserString);
            const user = new User(
                authenticatedUserData.user.id,
                authenticatedUserData.user.username,
                authenticatedUserData.user.email,
                authenticatedUserData.user.age,
                authenticatedUserData.user.gender,
                authenticatedUserData.user.phone,
                authenticatedUserData.user.emaiVerifiedAt,
                authenticatedUserData.user.createdAt,
                authenticatedUserData.user.updatedAt,
                authenticatedUserData.user.userRole,
                authenticatedUserData.user.isActivated,
            );
            const authenticatedUser: AuthenticatedUser = {
                user: user,
                expiresIn: authenticatedUserData.expiresIn,
                token: authenticatedUserData.token,
                tokenType: authenticatedUserData.tokenType
            }

            return authenticatedUser;
        }

        return null;

    }

}