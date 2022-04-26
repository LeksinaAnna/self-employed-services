import { Injectable, NotFoundException } from '@nestjs/common';
import { ManyItem, QueryType, WithUpdater } from '../../../../../common/interfaces/common';
import { UserUseCase } from '../ports/user.use-case';
import { UserProfile, UserProfileCreateProperties, UserProfileUpdateProperties } from '../entities/user-profile.entity';
import {
    LargeUser,
    UserCreateProperties,
    UserEntity,
    UserEmail,
    User,
    UserWithPassword, UserId, UserWithDescription, UserUpdateProperties,
} from '../entities/user.entity';
import { RolesService } from '../../roles/services/roles.service';
import { UserProfileService } from './user-profile.service';
import { UserAdapterService } from './adapters/user-adapter.service';

/**
 *
 * Сервис отвечающий за взаимодействие с пользователями
 */
@Injectable()
export class UserService implements UserUseCase {
    constructor(
        private readonly _userPort: UserAdapterService,
        private readonly _userProfileService: UserProfileService,
        private readonly _rolesService: RolesService,
    ) {}

    /**
     * Метод регистрации нового пользователя
     */
    public async createUserAccount(
        properties: UserProfileCreateProperties & UserCreateProperties,
    ): Promise<LargeUser> {
        // Регаем аккаунт
        const accountEntity = new UserEntity({
            password: properties.password,
            email: properties.email,
        });

        const account = await this._userPort.createAccount(accountEntity);
        const role = await this._rolesService.assignRoleToUser(account.accountId, properties.role);
        // Создаем профиль\инфу о пользователе
        const profile = await this._userProfileService.createUserProfile({
            ...properties,
            profileId: accountEntity.accountId
        });

        return {
            accountId: account.accountId,
            email: account.email,
            profile,
            roles: [role],
            created: account.created,
        };
    }

    async getUserByLogin(email: UserEmail): Promise<LargeUser> {
        return await this._userPort.getUserByLogin(email);
    }

    async getAccount(email: UserEmail): Promise<User & UserWithPassword> {
        return await this._userPort.getAccount(email);
    }

    async updateUserInfo(userId: UserId, properties: UserProfileUpdateProperties): Promise<UserProfile> {
        const user = await this._userPort.getUserById(userId);

        if (!user) {
            throw new NotFoundException('Пользователя не существует')
        }

        return await this._userProfileService.updateUserProfile(userId, properties);
    }

    async getUserById(userId: UserId): Promise<LargeUser> {
        return await this._userPort.getUserById(userId);
    }

    async getSpecialists(query: QueryType): Promise<ManyItem<LargeUser>> {
        return await this._userPort.getSpecialists(query);
    }

    async getSpecialistsWithDescription(query: QueryType): Promise<ManyItem<LargeUser & UserWithDescription>> {
        return await this._userPort.getSpecialists(query, true);
    }

    async updateSpecialist(properties: UserUpdateProperties & WithUpdater, specialistId: UserId): Promise<LargeUser & UserWithDescription> {
        const specialist = await this._userPort.getUserById(specialistId);

        if(!specialist) {
            throw new NotFoundException('обновляемый пользователь не найден');
        }

        const account = await this._userPort.getAccount(specialist.email);

        const updatedEntity = new UserEntity({
            ...account,
            ...properties,
            modifiedBy: properties.updater
        });

        await this._userPort.saveUser(updatedEntity);

        return specialist;
    }
}
