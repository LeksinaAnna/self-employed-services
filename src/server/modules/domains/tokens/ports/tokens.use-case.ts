import { AccessToken, RefreshToken, TokenData, TokenPayload, Tokens } from '../entities/token.entity';
import { UserId } from '../../users/entities/user.entity';

export interface TokensUseCase {
    generateAuthTokens: (user: TokenPayload) => Tokens;

    saveToken: (userId: UserId, refreshToken: RefreshToken) => Promise<void>;

    removeToken: (authToken: string) => Promise<void>;

    validateAuthToken: (token: RefreshToken | AccessToken) => TokenData;

    generateRegToken: (userId: UserId) => string;

    validateRegToken: (token: string) => { userId: string };
}
