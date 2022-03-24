import { Injectable } from '@nestjs/common';
import { UserProfileUseCase } from '../ports/user-profile.use-case';
import {UserProfile, UserProfileCreateProperties, UserProfileEntity} from '../entities/user-profile.entity';
import { UserProfileAdapterService } from './adapters/user-profile-adapter.service';

@Injectable()
export class UserProfileService implements UserProfileUseCase {
    constructor(private readonly _userProfilePort: UserProfileAdapterService) {}

    async createUserProfile(properties: UserProfileCreateProperties): Promise<UserProfile> {
        // Профиль создается с id пользователя
        const profile = new UserProfileEntity({ ...properties });

        return await this._userProfilePort.createUserProfile(profile);
    }
}
