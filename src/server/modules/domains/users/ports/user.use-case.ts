import { UserProfile, UserProfileCreateProperties } from '../entities/user-profile.entity';
import { LargeUser, UserCreateProperties, UserEmail } from '../entities/user.entity';

export interface UserUseCase {
    createUserAccount(properties: UserProfileCreateProperties & UserCreateProperties): Promise<LargeUser>;

    getUserByLogin(login: UserEmail): Promise<LargeUser>;

    updateUser(properties: UserCreateProperties & UserProfileCreateProperties): Promise<UserProfile>;
}
