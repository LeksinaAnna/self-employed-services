import { Injectable } from '@nestjs/common';
import { Brackets, createQueryBuilder } from 'typeorm';
import { ManyItem, QueryType } from '../../../../../../common/interfaces/common';
import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';
import { LargeUser, User, UserEmail, UserEntity, UserId, UserWithPassword } from '../../entities/user.entity';
import { UserOrmEntity } from '../../orm-entities/user.orm-entity';
import { UserMapper } from '../../mappers/user.mapper';
import { UserPort } from '../../ports/user.port';
import { Specialist } from '../../entities/user-profile.entity';
import { UserProfileOrmEntity } from '../../orm-entities/user-profile.orm-entity';

@Injectable()
export class UserAdapterService extends PersistenceAdapter implements UserPort {
    constructor() {
        super();
    }

    async getSpecialistsForAdmin(
        { search = '', take = '10', skip = '0' }: QueryType,
        withDescription = false,
    ): Promise<ManyItem<LargeUser>> {
        const [items, count] = await createQueryBuilder(UserOrmEntity, 'user')
            .where(qb => {
                if (search) {
                    qb.where(`profile.fullName ILIKE :value OR user.email ILIKE :value`, { value: `%${search}%` });
                }

                if (withDescription) {
                    qb.addSelect(`user.description`);
                }
            })
            .andWhere(`profile.profession IS NOT NULL`)
            .leftJoinAndSelect('user.profile', 'profile')
            .skip(parseInt(skip, 10))
            .take(parseInt(take, 10))
            .getManyAndCount();

        return { items, count };
    }

    async getSpecialistsForUser({
        search = '',
        take = '10',
        skip = '0',
        type,
    }: QueryType): Promise<ManyItem<Specialist>> {
        const [items, count] = await createQueryBuilder(UserProfileOrmEntity, 'profile')
            .where(`profile.profession IS NOT NULL`)
            .andWhere(
                new Brackets(qb => {
                    if (search) {
                        qb.where(`profile.fullName ILIKE :value OR profile.contacts->>'email' ILIKE :value`, { value: `%${search}%` });
                    }

                    if (type) {
                        qb.andWhere(`profile.profession = :type`, { type });
                    }
                }),
            )
            .andWhere('services IS NOT NULL')
            .leftJoinAndSelect('profile.services', 'services', 'services.inBasket = false')
            .skip(parseInt(skip, 10))
            .take(parseInt(take, 10))
            .getManyAndCount();

        return { items, count };
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

    async saveUser(properties: UserEntity): Promise<User> {
        return await this._entityManager.save(UserMapper.mapToOrmEntity(properties));
    }
}
