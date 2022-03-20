import { PersistenceAdapter } from '../../../common/persistence-adapter/persistence-adapter';
import { UserProfilePort } from '../ports/user-profile.port';
import { UserProfile } from '../entities/user-profile.entity';
import { Injectable } from '@nestjs/common';
import {UserProfileMapper} from "../mappers/user-profile.mapper";

@Injectable()
export class UserProfilePersistenceAdapterService extends PersistenceAdapter implements UserProfilePort {
    constructor() {
        super();
    }

    async createUserProfile(properties: UserProfile): Promise<UserProfile> {
        return await this._entityManager.save(UserProfileMapper.mapToOrmEntity(properties));
    }
}
