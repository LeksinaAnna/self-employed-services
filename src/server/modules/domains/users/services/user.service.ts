import { UserUseCase } from '../ports/user.use-case';
import {UserProfile, UserProfileCreateProperties, WithUserProfile} from '../entities/user-profile.entity';
import {
    LargeUser,
    UserCreateProperties,
    UserEntity,
    UserEmail,
    User,
    UserWithPassword,
} from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserAdapterService } from './adapters/user-adapter.service';

/**
 *
 * Сервис отвечающий за взаимодействие с пользователями
 */
@Injectable()
export class UserService implements UserUseCase {
    constructor(private readonly _userPort: UserAdapterService, private readonly _userProfileService: UserProfileService) {}

    /**
     * Метод регистрации нового пользователя
     */
    public async createUserAccount(properties: UserProfileCreateProperties & UserCreateProperties): Promise<LargeUser> {
        // Регаем аккаунт
        const accountEntity = new UserEntity({
            password: properties.password,
            email: properties.email,
        });

        const account = await this._userPort.createAccount(accountEntity);

        // Создаем профиль\инфу о пользователе
        const profile = await this._userProfileService.createUserProfile({
            userId: account.userId,
            birthday: properties.birthday,
            contacts: properties.contacts,
            fullName: properties.fullName,
        });

        return {
            userId: account.userId,
            email: account.email,
            created: account.created,
            fullName: profile.fullName,
            birthday: profile.birthday,
            contacts: profile.contacts,
        };
    }

    async getUserByLogin(email: UserEmail): Promise<User & WithUserProfile> {
        return await this._userPort.getUserByLogin(email);
    }

    async getAccount(email: UserEmail): Promise<User & UserWithPassword> {
        return await this._userPort.getAccount(email);
    }

    async updateUser(properties: UserCreateProperties & UserProfileCreateProperties): Promise<UserProfile> {
        return Promise.resolve(undefined);
    }
}
