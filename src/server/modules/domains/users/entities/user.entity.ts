import moment from 'moment';
import { WithUserProfile } from './user-profile.entity';
import { v4 as uuidv4 } from 'uuid';
import { RoleType, WithRoles } from '../../roles/entities/role.entity';

export type UserId = string;
export type UserEmail = string;

export interface UserCreateProperties {
    email: UserEmail;
    password: string;
    role?: RoleType;
}

export type LargeUser = User & WithUserProfile & WithRoles;

export interface User {
    userId?: UserId;
    email: UserEmail;
    created?: string;
}

export interface UserWithPassword {
    password: string;
}

export class UserEntity implements User, UserWithPassword {
    readonly userId?: UserId;
    readonly email: UserEmail;
    readonly password: string;
    readonly created?: string;

    constructor({ userId, password, email, created }: User & UserWithPassword) {
        this.userId = userId || uuidv4();
        this.email = email;
        this.password = password;
        this.created = created || moment().format();
    }
}
