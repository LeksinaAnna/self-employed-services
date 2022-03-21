import { Module } from '@nestjs/common';
import { UserWebController } from './user-web.controller';
import { UserPersistenceModule } from '../user-persistence/user-persistence.module';
import { AuthPersistenceModule } from '../../auth/auth-persistence/auth-persistence.module';
import { TokensPersistenceModule } from '../../tokens/tokens-persistence/tokens-persistence.module';

@Module({
    providers: [],
    controllers: [UserWebController],
    imports: [UserPersistenceModule, AuthPersistenceModule, TokensPersistenceModule],
})
export class UserWebModule {}
