import {BadRequestException, Body, Controller, Delete, Inject, Post, Req, Res} from '@nestjs/common';
import { LargeUser, UserCreateProperties } from '../../users/entities/user.entity';
import { UserProfile, UserProfileCreateProperties } from '../../users/entities/user-profile.entity';
import { AuthUseCase, AuthUseCaseSymbol } from '../ports/auth.use-case';
import { WithAccessToken } from '../../tokens/entities/token.entity';
import { Response, Request } from 'express';
import {NotAuth} from "../../../../nest-decorators/decorators/not-auth";

@Controller('auth')
export class AuthWebController {
    constructor(
        @Inject(AuthUseCaseSymbol)
        private readonly _authService: AuthUseCase,
    ) {}

    @NotAuth()
    @Post('/registration')
    async registration(
        @Body() body: UserProfileCreateProperties & UserCreateProperties,
        @Res({ passthrough: true }) response: Response
    ): Promise<LargeUser> {
        if (Object.keys(body).length === 0) {
            throw new BadRequestException('Отсутствует тело запроса');
        }
        const { refreshToken, ...userData } = await this._authService.registration(body);
        response.cookie('authToken', refreshToken, { httpOnly: true });

        return userData;
    }

    @NotAuth()
    @Post('/login')
    async login(
        @Body() body: UserCreateProperties,
        @Res({ passthrough: true }) response: Response,
    ): Promise<UserProfile & WithAccessToken> {
        const { refreshToken, ...authData } = await this._authService.login(body);
        response.cookie('authToken', refreshToken, { httpOnly: true });

        return authData;
    }

    @Delete('/logout')
    async logout(@Res({ passthrough: true }) response: Response, @Req() request: Request) {
        const { authToken } = request.cookies;
        console.log(request.cookies)
        response.clearCookie('authToken');

        await this._authService.logout(authToken as string);

        return { message: 'OK' }
    }
}
