import { UserProfilePort } from '../ports/user-profile.port';
import { UserProfileUseCase } from '../ports/user-profile.use-case';
import {UserProfile, UserProfileCreateProperties, UserProfileEntity} from '../entities/user-profile.entity';

export class UserProfileService implements UserProfileUseCase {
    constructor(private readonly _userProfilePort: UserProfilePort) {}

    async createUserProfile(properties: UserProfileCreateProperties): Promise<UserProfile> {
        // Профиль создается с id пользователя
        const profile = new UserProfileEntity({
            profileId: properties.userId,
            birthday: properties.birthday,
            fullName: properties.fullName,
            contacts: properties.contacts
        });

        return await this._userProfilePort.createUserProfile(profile);
    }
}
