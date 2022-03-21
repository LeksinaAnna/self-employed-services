import { LargeUser, UserCreateProperties } from '../../users/entities/user.entity';
import { UserProfile, UserProfileCreateProperties } from '../../users/entities/user-profile.entity';
import { Tokens } from '../../tokens/entities/token.entity';

export const AuthUseCaseSymbol = Symbol('AuthUseCase');

export interface AuthUseCase {
    login(authData: UserCreateProperties): Promise<UserProfile & Tokens>;

    registration(properties: UserProfileCreateProperties & UserCreateProperties): Promise<LargeUser & Tokens>;

    logout(authToken: any): Promise<void>;
}
