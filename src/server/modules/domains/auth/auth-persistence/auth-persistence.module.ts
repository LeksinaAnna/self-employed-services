import { Module, Provider } from '@nestjs/common';
import { AuthUseCaseSymbol } from '../ports/auth.use-case';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../users/services/user.service';
import { UserProfileService } from '../../users/services/user-profile.service';
import { UserProfilePersistenceAdapterService } from '../../users/user-persistence/user-profile-persistence-adapter.service';
import { UserPersistenceAdapterService } from '../../users/user-persistence/user-persistence-adapter.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

const AuthProvider: Provider = {
    provide: AuthUseCaseSymbol,
    useFactory: (
        userProfilePersistenceAdapterService: UserProfilePersistenceAdapterService,
        userPersistenceAdapterService: UserPersistenceAdapterService,
        jwtService: JwtService,
    ) => {
        const profileService = new UserProfileService(userProfilePersistenceAdapterService);
        const userService = new UserService(userPersistenceAdapterService, profileService);
        return new AuthService(userService, jwtService);
    },
    inject: [UserProfilePersistenceAdapterService, UserPersistenceAdapterService, JwtService],
};

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.AUTH_SECRET_KEY,
            signOptions: { expiresIn: '20m' },
        }),
    ],
    providers: [UserProfilePersistenceAdapterService, UserPersistenceAdapterService, AuthProvider],
    exports: [AuthUseCaseSymbol],
})
export class AuthPersistenceModule {}
