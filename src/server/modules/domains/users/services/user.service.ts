import { UserUseCase } from '../ports/user.use-case';
import { UserProfile, UserProfileCreateProperties } from '../entities/user-profile.entity';
import { UserCreateProperties, UserEntity, UserLogin } from '../entities/user.entity';
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
    ): Promise<UserProfile> {
        // Регаем аккаунт
        const account = new UserEntity({
            userId: uuidv4(),
            password: properties.password,
            login: properties.login,
            created: moment().format(),
        });
        const newAccount = await this._userPort.createAccount(account);

        // Создаем профиль\инфу о пользователе
        return await this._userProfileService.createUserProfile({
            userId: newAccount.userId,
            birthday: properties.birthday,
            contacts: properties.contacts,
            fullName: properties.fullName,
        });
    }

    async getUserByLogin(login: UserLogin): Promise<any> {
        return await this._userPort.getUserByLogin(login);
    }
}
