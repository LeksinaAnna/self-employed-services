import { UserProfile } from '../entities/user-profile.entity';

export interface UserProfilePort {
    createUserProfile: (properties: UserProfile) => Promise<UserProfile>;
}