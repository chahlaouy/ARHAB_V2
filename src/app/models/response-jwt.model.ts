
export interface ResponseJwt{
    access_token: string,
    token_type: string,
    expires_in: string,
    user: {
        id: number,
        username: string,
        email: string,
        gender: string,
        phone: string,
        age: number,
        email_verified_at: string,
        created_at: string,
        updated_at: string,
        user_role: string

    }
}