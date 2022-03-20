import { PersistenceAdapter } from '../../../common/persistence-adapter/persistence-adapter';
import { UserPort } from '../ports/user.port';
import {User, UserEntity, UserLogin} from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { createQueryBuilder } from 'typeorm';
import { UserOrmEntity } from '../orm-entities/user.orm-entity';
import {UserMapper} from "../mappers/user.mapper";

@Injectable()
export class UserPersistenceAdapterService extends PersistenceAdapter implements UserPort {
    constructor() {
        super();
    }

    public async createAccount(properties: User): Promise<User> {
        const account = new UserEntity(properties);
        return await this._entityManager.save(UserMapper.mapToOrmEntity(account));
    }

    public async getUserByLogin(login: UserLogin): Promise<User> {
        return await createQueryBuilder(UserOrmEntity, 'user')
            .where(`user.login = :login`, { login })
            .leftJoinAndSelect(`user.profile`, 'profile')
            .getOne();
    }
}