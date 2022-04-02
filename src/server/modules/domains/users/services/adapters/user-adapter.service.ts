import { Injectable } from '@nestjs/common';
import { createQueryBuilder } from 'typeorm';
import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';
import { User, UserEntity, UserEmail, UserWithPassword, LargeUser, UserId } from '../../entities/user.entity';
import { UserOrmEntity } from '../../orm-entities/user.orm-entity';
import { UserMapper } from '../../mappers/user.mapper';
import { UserPort } from '../../ports/user.port';

@Injectable()
export class UserAdapterService extends PersistenceAdapter implements UserPort {
    constructor() {
        super();
    }

    public async createAccount(properties: User & UserWithPassword): Promise<User> {
        const account = new UserEntity(properties);
        return await this._entityManager.save(UserMapper.mapToOrmEntity(account));
    }

    public async getUserByLogin(email: UserEmail): Promise<LargeUser> {
        return await createQueryBuilder<LargeUser>(UserOrmEntity, 'user')
            .where(`user.email = :email`, { email })
            .leftJoinAndSelect(`user.profile`, 'profile')
            .leftJoinAndSelect('user.roles', 'role')
            .getOne();
    }

    async getAccount(email: UserEmail): Promise<User & UserWithPassword> {
        return await createQueryBuilder(UserOrmEntity, 'user')
            .where(`user.email = :email`, { email })
            .addSelect('user.password')
            .getOne();
    }

    async getUserById(userId: UserId): Promise<LargeUser> {
        return await createQueryBuilder<LargeUser>(UserOrmEntity, 'user')
            .where(`user.accountId = :userId`, { userId })
            .leftJoinAndSelect(`user.profile`, 'profile')
            .leftJoinAndSelect('user.roles', 'role')
            .getOne();
    }
}