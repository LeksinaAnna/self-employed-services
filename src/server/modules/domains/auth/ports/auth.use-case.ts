import { LargeUser, UserCreateProperties } from '../../users/entities/user.entity';
import { UserProfile, UserProfileCreateProperties } from '../../users/entities/user-profile.entity';
import { RefreshToken, Tokens, WithAccessToken } from '../../tokens/entities/token.entity';

export interface AuthUseCase {
    login(authData: UserCreateProperties): Promise<UserProfile & Tokens>;

    registration(properties: UserProfileCreateProperties & UserCreateProperties): Promise<LargeUser & Tokens>;

    logout(authToken: string): Promise<void>;

    refreshAuthToken(refreshToken: RefreshToken): Promise<WithAccessToken>;
}
