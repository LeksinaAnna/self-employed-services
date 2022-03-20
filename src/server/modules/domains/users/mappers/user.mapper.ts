import { UserOrmEntity } from '../orm-entities/user.orm-entity';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
    static mapToDomain(user: UserOrmEntity): UserEntity {
        return new UserEntity(user);
    }

    static mapToOrmEntity(domain: UserEntity): UserOrmEntity {
        const ormEntity = new UserOrmEntity();

        for (const key in domain) {
            if (domain[key]) {
                ormEntity[key] = domain[key];
            }
        }

        return ormEntity;
    }
}