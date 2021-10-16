
export class User{
    constructor(
        private id: number,
        private username: string,
        private email: string,
        private age: number,
        private gender: string,
        private phone: string,
        private emailVerifiedAt: string,
        private createdAt: string,
        private updatedAt: string,
        private userRole: string,
        private isActivated: boolean
    ){}
}