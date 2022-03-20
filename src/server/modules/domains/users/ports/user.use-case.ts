import { UserProfile, UserProfileCreateProperties } from '../entities/user-profile.entity';
import {User, UserCreateProperties, UserLogin} from '../entities/user.entity';

export const UserUseCaseSymbol = Symbol('UserUseCase');

export interface UserUseCase {
    createUserAccount: (properties: UserProfileCreateProperties & UserCreateProperties) => Promise<UserProfile>;

    getUserByLogin: (login: UserLogin) => Promise<User & UserProfile>;
}
