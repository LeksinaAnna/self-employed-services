import { Module, Provider } from '@nestjs/common';
import { TokensUseCaseSymbol } from '../ports/tokens.use-case';
import { TokensService } from '../services/tokens.service';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {TokensPersistenceAdapterService} from "./tokens-persistence-adapter.service";

const TokensServiceProvider: Provider = {
    provide: TokensUseCaseSymbol,
    useFactory: (jwtService: JwtService, tokensPersistenceAdapterService: TokensPersistenceAdapterService) => {
        return new TokensService(jwtService, tokensPersistenceAdapterService);
    },
    inject: [JwtService, TokensPersistenceAdapterService],
};

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.AUTH_SECRET_KEY,
            signOptions: { expiresIn: '20m' },
        }),
    ],
    providers: [TokensPersistenceAdapterService, TokensServiceProvider],
    exports: [TokensUseCaseSymbol, JwtModule],
})
export class TokensPersistenceModule {}
