import { UserUseCase } from '../ports/user.use-case';
import { UserProfileCreateProperties } from '../entities/user-profile.entity';
import {LargeUser, UserCreateProperties, UserEntity, UserLogin} from '../entities/user.entity';
import { UserPort } from '../ports/user.port';
import { UserProfileUseCase } from '../ports/user-profile.use-case';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

/**
 *
 * Сервис отвечающий за взаимодействие с пользователями
 */
export class UserService implements UserUseCase {
    constructor(private readonly _userPort: UserPort, private readonly _userProfileService: UserProfileUseCase) {}

    /**
     * Метод регистрации нового пользователя
     */
    public async createUserAccount(
        properties: UserProfileCreateProperties & UserCreateProperties,
    ): Promise<LargeUser> {
        // Регаем аккаунт
        const accountEntity = new UserEntity({
            userId: uuidv4(),
            password: properties.password,
            login: properties.login,
            created: moment().format(),
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
            login: account.login,
            created: account.created,
            fullName: profile.fullName,
            birthday: profile.birthday,
            contacts: profile.contacts
        }
    }

    async getUserByLogin(login: UserLogin): Promise<any> {
        return await this._userPort.getUserByLogin(login);
    }
}
