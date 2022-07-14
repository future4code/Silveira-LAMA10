
export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: UserRole
    ) { }

    public getId = () => this.id
    public getName = () => this.name
    public getEmail = () => this.email
    public getPassword = () => this.password
    public getRole = () => this.role;

    static stringToUserRole(input: string): UserRole {
        switch (input) {
            case "NORMAL":
                return UserRole.NORMAL;
            case "ADMIN":
                return UserRole.ADMIN;
            default:
                throw new Error("Invalid user role");
        }
    }

    static toUserModel(user: any) {
        return new User(user.id, user.name, user.email, user.password, User.stringToUserRole(user.role));
    }
}

export interface UserInputDTO {
    email: string;
    password: string;
    name: string;
    role: string;
}

export interface LoginInputDTO {
    email: string;
    password: string;
}

export enum UserRole {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}