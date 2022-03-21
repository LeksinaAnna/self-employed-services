import { Injectable } from '@nestjs/common';
import { PersistenceAdapter } from '../../../common/persistence-adapter/persistence-adapter';
import { TokensPort } from '../ports/tokens.port';
import { Token } from '../entities/token.entity';
import { UserId } from '../../users/entities/user.entity';
import { TokenOrmEntity } from '../orm-entities/token-orm.entity';

@Injectable()
export class TokensPersistenceAdapterService extends PersistenceAdapter implements TokensPort {
    constructor() {
        super();
    }

    async createToken(tokenData: Token): Promise<Token> {
        return await this._entityManager.save(tokenData);
    }

    async getTokenByUserId(userId: UserId): Promise<Token> {
        return await this._entityManager.findOne(TokenOrmEntity, { where: { userId } });
    }

    async updateToken(tokenData: Token): Promise<Token> {
        return await this._entityManager.save(tokenData);
    }

    async removeToken(authToken: string): Promise<void> {
        await this._entityManager.delete(TokenOrmEntity, { refreshToken: authToken})
    }
}
