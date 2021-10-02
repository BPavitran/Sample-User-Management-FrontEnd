import {UserType} from "../common/user-type";

export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    password: string;
    userType: UserType;
    email: string;
    age?: number;
    address?: string;
}
