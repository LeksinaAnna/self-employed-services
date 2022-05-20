import { LargeUser, UserCreateProperties } from '../../users/entities/user.entity';
import { UserProfileCreateProperties } from '../../users/entities/user-profile.entity';
import { RefreshToken, Tokens, WithAccessToken } from '../../tokens/entities/token.entity';

export interface AuthUseCase {
    login(authData: UserCreateProperties): Promise<LargeUser & Tokens>;

    registration(properties: UserProfileCreateProperties & UserCreateProperties): Promise<LargeUser & Tokens>;

    logout(authToken: string): Promise<void>;

    refreshAuthToken(refreshToken: RefreshToken): Promise<WithAccessToken>;
}
