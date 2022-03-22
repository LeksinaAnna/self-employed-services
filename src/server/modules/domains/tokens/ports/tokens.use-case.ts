import {AccessToken, RefreshToken, TokenData, TokenPayload, Tokens} from '../entities/token.entity';
import { UserId } from '../../users/entities/user.entity';

export interface TokensUseCase {
    generateTokens(user: TokenPayload): Tokens;

    saveToken(userId: UserId, refreshToken: RefreshToken): Promise<void>;

    removeToken(authToken: string): Promise<void>;

    validateToken(token: RefreshToken | AccessToken): TokenData;
}
