import { Module } from '@nestjs/common';
import { TokensService } from './services/tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { TokensAdapterService } from './services/adapters/tokens-adapter.service';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.AUTH_SECRET_KEY,
            signOptions: { expiresIn: '20m' },
        }),
    ],
    providers: [TokensService, TokensAdapterService],
    exports: [TokensService],
})
export class TokensModule {}
