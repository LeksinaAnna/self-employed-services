import { UserProfile, UserProfileEntity } from '../entities/user-profile.entity';

export interface UserProfilePort {
    createUserProfile: (properties: UserProfileEntity) => Promise<UserProfile>;
}