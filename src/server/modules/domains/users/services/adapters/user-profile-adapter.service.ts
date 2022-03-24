import { Injectable } from '@nestjs/common';
import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';
import { UserProfilePort } from '../../ports/user-profile.port';
import { UserProfile, UserProfileEntity } from '../../entities/user-profile.entity';
import { UserProfileMapper } from '../../mappers/user-profile.mapper';

@Injectable()
export class UserProfileAdapterService extends PersistenceAdapter implements UserProfilePort {
    constructor() {
        super();
    }

    async createUserProfile(properties: UserProfileEntity): Promise<UserProfile> {
        return await this._entityManager.save(UserProfileMapper.mapToOrmEntity(properties));
    }
}
