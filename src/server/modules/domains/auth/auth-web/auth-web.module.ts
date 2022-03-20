import { Module } from '@nestjs/common';
import { AuthWebController } from './auth-web.controller';
import { AuthPersistenceModule } from '../auth-persistence/auth-persistence.module';

@Module({
    imports: [AuthPersistenceModule],
    controllers: [AuthWebController],
})
export class AuthWebModule {}
