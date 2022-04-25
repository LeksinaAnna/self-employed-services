import { UserProfile, UserProfileEntity } from '../entities/user-profile.entity';
import { UserId } from '../entities/user.entity';

export interface UserProfilePort {
    saveUserProfile: (properties: UserProfileEntity) => Promise<UserProfile>;

    getProfileByUserId: (userId: UserId) => Promise<UserProfile>;
}