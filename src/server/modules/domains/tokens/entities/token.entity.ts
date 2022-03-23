import { UserEmail, UserId } from '../../users/entities/user.entity';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

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
}

export interface TokenData {
    userId: UserId;
    email: UserEmail;
    iat: number;
    exp: number;
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
