import { Module, Provider } from '@nestjs/common';
import { AuthUseCaseSymbol } from '../ports/auth.use-case';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../users/services/user.service';
import { UserProfileService } from '../../users/services/user-profile.service';
import { UserProfilePersistenceAdapterService } from '../../users/user-persistence/user-profile-persistence-adapter.service';
import { UserPersistenceAdapterService } from '../../users/user-persistence/user-persistence-adapter.service';
import { TokensService } from '../../tokens/services/tokens.service';
import { JwtService } from '@nestjs/jwt';
import { TokensPersistenceAdapterService } from '../../tokens/tokens-persistence/tokens-persistence-adapter.service';
import {TokensPersistenceModule} from "../../tokens/tokens-persistence/tokens-persistence.module";

const AuthProvider: Provider = {
    provide: AuthUseCaseSymbol,
    useFactory: (
        userProfilePersistenceAdapterService: UserProfilePersistenceAdapterService,
        userPersistenceAdapterService: UserPersistenceAdapterService,
        tokensPersistenceAdapterService: TokensPersistenceAdapterService,
        jwtService: JwtService,
    ) => {
        const profileService = new UserProfileService(userProfilePersistenceAdapterService);
        const userService = new UserService(userPersistenceAdapterService, profileService);
        const tokensService = new TokensService(jwtService, tokensPersistenceAdapterService);
        return new AuthService(userService, tokensService);
    },
    inject: [UserProfilePersistenceAdapterService, UserPersistenceAdapterService, TokensPersistenceAdapterService, JwtService],
};

@Module({
    imports: [TokensPersistenceModule],
    providers: [
        UserProfilePersistenceAdapterService,
        UserPersistenceAdapterService,
        TokensPersistenceAdapterService,
        AuthProvider,
    ],
    exports: [AuthUseCaseSymbol],
})
export class AuthPersistenceModule {}
