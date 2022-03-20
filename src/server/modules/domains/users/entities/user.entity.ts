import moment from 'moment';

export type UserId = string;
export type UserLogin = string;

export interface UserCreateProperties {
    login: UserLogin;
    password: string;
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
