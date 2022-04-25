import { Injectable } from '@nestjs/common';
import { createQueryBuilder } from 'typeorm';
import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';
import { UserProfilePort } from '../../ports/user-profile.port';
import { UserProfile, UserProfileEntity } from '../../entities/user-profile.entity';
import { UserProfileMapper } from '../../mappers/user-profile.mapper';
import { UserId } from '../../entities/user.entity';
import { UserProfileOrmEntity } from '../../orm-entities/user-profile.orm-entity';

@Injectable()
export class UserProfileAdapterService extends PersistenceAdapter implements UserProfilePort {
    constructor() {
        super();
    }

    async saveUserProfile(properties: UserProfileEntity): Promise<UserProfile> {
        return await this._entityManager.save(UserProfileMapper.mapToOrmEntity(properties));
    }

    async getProfileByUserId(userId: UserId): Promise<UserProfile> {
        return await createQueryBuilder(UserProfileOrmEntity, 'profile')
            .where(`profile.profileId = :userId`, { userId })
            .getOne();
    }
}
