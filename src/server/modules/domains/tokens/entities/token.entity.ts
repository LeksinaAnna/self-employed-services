import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { UserEmail, UserId } from '../../users/entities/user.entity';
import { RoleType } from '../../roles/entities/role.entity';

export type AccessToken = string;
export type RefreshToken = string;

export interface Tokens {
    accessToken: AccessToken;
    refreshToken: RefreshToken;
}

export interface WithAccessToken {
    accessToken: AccessToken;
}

export interface TokenPayload {
    userId: UserId;
    email: UserEmail;
    roles: RoleType[];
}

export interface TokenData {
    userId: UserId;
    email: UserEmail;
    roles: RoleType[];
    iat: number; // дата начала действия в секундах
    exp: number; // дата окончания в секундах
}

export interface Token {
    tokenId?: string;
    userId: UserId;
    refreshToken: RefreshToken;
    created?: string;
}

export class TokenEntity implements Token {
    readonly tokenId?: string;
    readonly userId: UserId;
    readonly refreshToken: RefreshToken;
    readonly created?: string;

    constructor({ userId, refreshToken, tokenId, created }: Token) {
        this.tokenId = tokenId || uuidv4();
        this.userId = userId;
        this.refreshToken = refreshToken;
        this.created = created || moment().format();
    }
}
