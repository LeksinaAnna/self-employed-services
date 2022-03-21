import { RefreshToken, Tokens } from '../entities/token.entity';
import { LargeUser, UserId } from '../../users/entities/user.entity';

export const TokensUseCaseSymbol = Symbol('TokensUseCase');

export interface TokensUseCase {
    generateTokens(user: LargeUser): Tokens;

    saveToken(userId: UserId, refreshToken: RefreshToken): Promise<void>;

    removeToken(authToken: string): Promise<void>;
}
