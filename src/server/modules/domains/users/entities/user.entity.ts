import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { RoleType, WithRoles } from '../../roles/entities/role.entity';
import { WithUserProfile } from './user-profile.entity';

export type UserId = string;
export type UserEmail = string;

export interface UserCreateProperties {
    email: UserEmail;
    password: string;
    role?: RoleType;
}

export interface UserUpdateProperties {
    role?: RoleType;
    description: string;
}

export type LargeUser = User & WithUserProfile & WithRoles;

export interface User {
    accountId?: UserId;
    email: UserEmail;
    activated?: boolean;
    created?: string;
    modified?: string;
    modifiedBy?: UserId;
}

export interface UserWithPassword {
    password: string;
}

export interface UserWithDescription {
    description?: string;
}

export class UserEntity implements User, UserWithPassword, UserWithDescription {
    readonly accountId?: UserId;
    readonly email: UserEmail;
    readonly password: string;
    readonly created?: string;
    readonly description?: string;
    readonly modified?: string;
    readonly modifiedBy?: string;
    readonly activated?: boolean;

    constructor({ accountId, password, email, created, description, modifiedBy, activated  }: User & UserWithPassword & UserWithDescription) {
        this.accountId = accountId || uuidv4();
        this.email = email;
        this.password = password;
        this.created = created || moment().format();
        this.modified = moment().format();
        this.modifiedBy = modifiedBy || accountId;
        this.description = description || null;
        this.activated = activated || false;
    }
}
