import { Injectable } from '@nestjs/common';
import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';
import { TokensPort } from '../../ports/tokens.port';
import { Token } from '../../entities/token.entity';
import { UserId } from '../../../users/entities/user.entity';
import { TokenOrmEntity } from '../../orm-entities/token-orm.entity';
import {TokenMapper} from "../../mappers/token.mapper";

@Injectable()
export class TokensAdapterService extends PersistenceAdapter implements TokensPort {
    constructor() {
        super();
    }

    async createToken(tokenData: Token): Promise<Token> {
        return await this._entityManager.save(TokenMapper.mapToOrmEntity(tokenData));
    }

    async getTokenByUserId(userId: UserId): Promise<Token> {
        return await this._entityManager.findOne(TokenOrmEntity, { where: { userId } });
    }

    async updateToken(tokenData: Token): Promise<Token> {
        return await this._entityManager.save(TokenMapper.mapToOrmEntity(tokenData));
    }

    async removeToken(authToken: string): Promise<void> {
        await this._entityManager.delete(TokenOrmEntity, { refreshToken: authToken})
    }
}
