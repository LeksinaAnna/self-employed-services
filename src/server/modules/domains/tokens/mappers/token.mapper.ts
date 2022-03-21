import { TokenEntity } from '../entities/token.entity';
import { TokenOrmEntity } from '../orm-entities/token-orm.entity';

export class TokenMapper {
    static mapToDomain(token: TokenOrmEntity): TokenEntity {
        return new TokenEntity(token);
    }

    static mapToOrmEntity(domain: TokenEntity): TokenOrmEntity {
        const ormEntity = new TokenOrmEntity();

        for (const key in domain) {
            if (domain[key]) {
                ormEntity[key] = domain[key];
            }
        }

        return ormEntity;
    }
}