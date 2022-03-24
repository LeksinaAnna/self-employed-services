import { Injectable } from '@nestjs/common';
import { UserUseCase } from '../ports/user.use-case';
import { UserProfile, UserProfileCreateProperties, WithUserProfile } from '../entities/user-profile.entity';
import {
    LargeUser,
    UserCreateProperties,
    UserEntity,
    UserEmail,
    User,
    UserWithPassword,
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
    ): Promise<LargeUser & WithUserProfile> {
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
            profileId: account.accountId
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

    async updateUser(properties: UserCreateProperties & UserProfileCreateProperties): Promise<UserProfile> {
        return Promise.resolve(undefined);
    }
}
