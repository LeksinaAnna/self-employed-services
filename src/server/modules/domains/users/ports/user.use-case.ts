import {UserProfile, UserProfileCreateProperties, WithUserProfile} from '../entities/user-profile.entity';
import { LargeUser, User, UserCreateProperties, UserEmail } from '../entities/user.entity';

export interface UserUseCase {
    createUserAccount(properties: UserProfileCreateProperties & UserCreateProperties): Promise<LargeUser>;

    getUserByLogin(login: UserEmail): Promise<User & WithUserProfile>;

    updateUser(properties: UserCreateProperties & UserProfileCreateProperties): Promise<UserProfile>
}
