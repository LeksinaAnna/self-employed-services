import { Token } from '../entities/token.entity';
import { UserId } from '../../users/entities/user.entity';

export interface TokensPort {
    createToken(tokenData: Token): Promise<Token>;

    getTokenByUserId(userId: UserId): Promise<Token>;

    updateToken(tokenData: Token): Promise<Token>;

    removeToken(authToken: string): Promise<void>;
}