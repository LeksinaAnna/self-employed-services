import { Module } from '@nestjs/common';
import { UserWebController } from './user-web.controller';
import { UserPersistenceModule } from '../user-persistence/user-persistence.module';
import {AuthPersistenceModule} from "../../auth/auth-persistence/auth-persistence.module";

@Module({
    providers: [],
    controllers: [UserWebController],
    imports: [UserPersistenceModule, AuthPersistenceModule],
})
export class UserWebModule {}