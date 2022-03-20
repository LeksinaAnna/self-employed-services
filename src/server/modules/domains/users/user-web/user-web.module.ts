import { Module } from '@nestjs/common';
import { UserWebController } from './user-web.controller';
import { UserPersistenceModule } from '../user-persistence/user-persistence.module';

@Module({
    providers: [],
    controllers: [UserWebController],
    imports: [UserPersistenceModule],
})
export class UserWebModule {}