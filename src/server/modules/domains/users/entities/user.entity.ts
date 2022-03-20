import moment from 'moment';
import {UserContacts} from "./user-profile.entity";

export type UserId = string;
export type UserLogin = string;

export interface UserCreateProperties {
    login: UserLogin;
    password: string;
}

export interface WithToken {
    token: string;
}

export interface LargeUser {
    userId: UserId;
    fullName: string;
    contacts: UserContacts;
    birthday: string;
    login: UserLogin;
    created: string;
}

export interface User {
    userId: UserId;
    login: UserLogin;
    password: string;
    created: string;
}

export class UserEntity implements User {
    readonly login: UserLogin;
    readonly password: string;
    readonly userId: UserId;
    readonly created: string;

    constructor({ userId, password, login, created }: User) {
        this.userId = userId;
        this.login = login;
        this.password = password;
        this.userId = userId;
        this.created = created || moment().format();
    }
}
