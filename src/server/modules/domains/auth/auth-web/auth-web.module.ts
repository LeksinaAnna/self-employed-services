import { Module } from '@nestjs/common';
import { AuthWebController } from './auth-web.controller';
import { AuthService } from '../services/auth.service';
import { TokensModule } from '../../tokens/tokens.module';
import { UserWebModule } from '../../users/user-web/user-web.module';

@Module({
    imports: [UserWebModule, TokensModule],
    providers: [AuthService],
    controllers: [AuthWebController],
    exports: [AuthService],
})
export class AuthWebModule {}
