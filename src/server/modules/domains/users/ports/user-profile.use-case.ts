import { UserProfile, UserProfileCreateProperties, UserProfileUpdateProperties } from '../entities/user-profile.entity';
import { UserId } from '../entities/user.entity';

export interface UserProfileUseCase {
    createUserProfile: (properties: UserProfileCreateProperties) => Promise<UserProfile>;

    updateUserProfile: (userId: UserId, properties: UserProfileUpdateProperties) => Promise<UserProfile>;
}