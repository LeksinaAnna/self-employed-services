import {LargeUser, UserCreateProperties, WithToken} from '../../users/entities/user.entity';
import { UserProfile, UserProfileCreateProperties } from '../../users/entities/user-profile.entity';

export const AuthUseCaseSymbol = Symbol('AuthUseCase');

export interface AuthUseCase {
    login: (authData: UserCreateProperties) => Promise<UserProfile & WithToken>;
    registration: (properties: UserProfileCreateProperties & UserCreateProperties) => Promise<LargeUser>;
}