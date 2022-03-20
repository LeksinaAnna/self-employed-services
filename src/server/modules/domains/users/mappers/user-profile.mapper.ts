import { UserProfileOrmEntity } from '../orm-entities/user-profile.orm-entity';
import { UserProfileEntity } from '../entities/user-profile.entity';

export class UserProfileMapper {
    static mapToDomain(userProfile: UserProfileOrmEntity): UserProfileEntity {
        return new UserProfileEntity(userProfile);
    }

    static mapToOrmEntity(domain: UserProfileEntity): UserProfileOrmEntity {
        const ormEntity = new UserProfileOrmEntity();

        for (const key in domain) {
            if (domain[key]) {
                ormEntity[key] = domain[key];
            }
        }

        return ormEntity;
    }
}