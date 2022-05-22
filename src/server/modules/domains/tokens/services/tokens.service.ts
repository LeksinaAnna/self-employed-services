import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokensUseCase } from '../ports/tokens.use-case';
import { AccessToken, RefreshToken, TokenData, TokenEntity, TokenPayload, Tokens } from '../entities/token.entity';
import { UserId } from '../../users/entities/user.entity';
import { TokensAdapterService } from './adapters/tokens-adapter.service';

@Injectable()
export class TokensService implements TokensUseCase {
    constructor(private readonly _jwtService: JwtService, private readonly _tokensPort: TokensAdapterService) {}

    async removeToken(authToken: string): Promise<void> {
        await this._tokensPort.removeToken(authToken);
    }

    generateAuthTokens(payload: TokenPayload): Tokens {
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

    validateAuthToken(token: RefreshToken | AccessToken): TokenData {
        try {
            return this._jwtService.verify(token);
        } catch (e) {
            console.log(`[ERROR] - ${e.message}`);
            throw new UnauthorizedException(`Вы не авторизованы`);
        }
    }

    generateRegToken(userId: UserId): string {
        return this._jwtService.sign({ userId }, { expiresIn: '30d' });
    }

    validateRegToken(token: string): { userId: string } {
        try {
            return this._jwtService.verify(token);
        } catch (e) {
            throw new BadRequestException(`К`);
        }
    }
}
