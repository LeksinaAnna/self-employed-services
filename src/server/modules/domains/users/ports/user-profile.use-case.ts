import { UserProfile, UserProfileCreateProperties } from '../entities/user-profile.entity';

export interface UserProfileUseCase {
    createUserProfile: (properties: UserProfileCreateProperties) => Promise<UserProfile>;
}