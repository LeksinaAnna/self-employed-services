import { Injectable, NotFoundException } from '@nestjs/common';
import { UserProfileUseCase } from '../ports/user-profile.use-case';
import {
    UserProfile,
    UserProfileCreateProperties,
    UserProfileEntity,
    UserProfileUpdateProperties,
} from '../entities/user-profile.entity';
import { UserId } from '../entities/user.entity';
import { UserProfileAdapterService } from './adapters/user-profile-adapter.service';

@Injectable()
export class UserProfileService implements UserProfileUseCase {
    constructor(private readonly _userProfilePort: UserProfileAdapterService) {}

    async createUserProfile(properties: UserProfileCreateProperties): Promise<UserProfile> {
        // Профиль создается с id пользователя
        const profile = new UserProfileEntity({ ...properties });

        return await this._userProfilePort.saveUserProfile(profile);
    }

    async updateUserProfile(userId: UserId, properties: UserProfileUpdateProperties): Promise<UserProfile> {
        const profile = await this._userProfilePort.getProfileByUserId(userId);

        if (!profile) {
            throw new NotFoundException('Профиль не найден')
        }

        const profileEntity = new UserProfileEntity({
            ...profile,
            ...properties
        });

        return await this._userProfilePort.saveUserProfile(profileEntity);
    }
}
