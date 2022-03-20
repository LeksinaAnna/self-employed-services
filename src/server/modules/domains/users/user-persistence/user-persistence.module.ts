import { Module } from '@nestjs/common';
import { UserUseCaseSymbol } from '../ports/user.use-case';
import { UserService } from '../services/user.service';
import { UserProfileService } from '../services/user-profile.service';
import { UserPersistenceAdapterService } from './user-persistence-adapter.service';
import { UserProfilePersistenceAdapterService } from './user-profile-persistence-adapter.service';

@Module({
    providers: [
        UserProfilePersistenceAdapterService,
        UserPersistenceAdapterService,
        {
            provide: UserUseCaseSymbol,
            useFactory: (
                userProfilePersistenceAdapterService: UserProfilePersistenceAdapterService,
                userPersistenceAdapterService: UserPersistenceAdapterService,
            ) => {
                const userProfileService = new UserProfileService(userProfilePersistenceAdapterService);
                return new UserService(userPersistenceAdapterService, userProfileService);
            },
            inject: [UserProfilePersistenceAdapterService, UserPersistenceAdapterService],
        },
    ],
    exports: [UserUseCaseSymbol, UserPersistenceAdapterService],
})
export class UserPersistenceModule {}
