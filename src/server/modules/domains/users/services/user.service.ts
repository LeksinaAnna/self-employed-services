import { UserUseCase } from '../ports/user.use-case';
import { UserProfileCreateProperties } from '../entities/user-profile.entity';
import { LargeUser, UserCreateProperties, UserEntity, UserEmail } from '../entities/user.entity';
import { UserPort } from '../ports/user.port';
import { UserProfileUseCase } from '../ports/user-profile.use-case';

/**
 *
 * Сервис отвечающий за взаимодействие с пользователями
 */
export class UserService implements UserUseCase {
    constructor(private readonly _userPort: UserPort, private readonly _userProfileService: UserProfileUseCase) {}

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

    async getUserByLogin(email: UserEmail): Promise<any> {
        return await this._userPort.getUserByLogin(email);
    }
}
