import { TokensUseCase } from '../ports/tokens.use-case';
import { RefreshToken, TokenEntity, Tokens } from '../entities/token.entity';
import { LargeUser, UserId } from '../../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { TokensAdapterService } from './adapters/tokens-adapter.service';

@Injectable()
export class TokensService implements TokensUseCase {
    constructor(private readonly _jwtService: JwtService, private readonly _tokensPort: TokensAdapterService) {}

    async removeToken(authToken: string): Promise<void> {
        await this._tokensPort.removeToken(authToken);
    }

    generateTokens(user: LargeUser): Tokens {
        const payload = { userId: user.userId, email: user.email };
        const accessToken = this._jwtService.sign(payload, { expiresIn: '20m' });
        const refreshToken = this._jwtService.sign(payload, { expiresIn: '30d' });

        return { accessToken, refreshToken };
    }

    async saveToken(userId: UserId, refreshToken: RefreshToken): Promise<void> {
        // проверяем есть ли в базе токен
        const token = await this._tokensPort.getTokenByUserId(userId);

        if (token) {
            // Если есть то обновляем
            await this._tokensPort.updateToken({ ...token, refreshToken });
            return;
        }
        const tokenEntity = new TokenEntity({
            userId,
            refreshToken,
        });

        await this._tokensPort.createToken({ ...tokenEntity });
    }
}
