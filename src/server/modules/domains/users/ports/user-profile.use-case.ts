import { UserProfile, UserProfileCreateProperties } from '../entities/user-profile.entity';

export const userProfileUseCaseSymbol = Symbol('UserProfileUseCase');

export interface UserProfileUseCase {
    createUserProfile: (properties: UserProfileCreateProperties) => Promise<UserProfile>;
}