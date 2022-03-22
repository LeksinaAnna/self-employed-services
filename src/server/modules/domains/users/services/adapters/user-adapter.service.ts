import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';
import { UserPort } from '../../ports/user.port';
import { User, UserEntity, UserEmail } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserOrmEntity } from '../../orm-entities/user.orm-entity';
import { UserMapper } from '../../mappers/user.mapper';
import { WithUserProfile } from '../../entities/user-profile.entity';

@Injectable()
export class UserAdapterService extends PersistenceAdapter implements UserPort {
    constructor() {
        super();
    }

    public async createAccount(properties: User): Promise<User> {
        const account = new UserEntity(properties);
        return await this._entityManager.save(UserMapper.mapToOrmEntity(account));
    }

    public async getUserByLogin(email: UserEmail): Promise<User & WithUserProfile> {
        return await this._entityManager.findOne(UserOrmEntity, { where: { email: email }, relations: ['profile'] });
    }
}