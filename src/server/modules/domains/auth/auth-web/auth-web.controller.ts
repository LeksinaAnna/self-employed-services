import { Request, Response } from 'express';
import { BadRequestException, Body, Controller, Delete, Get, Post, Query, Req, Res } from '@nestjs/common';
import { LargeUser, UserCreateProperties } from '../../users/entities/user.entity';
import { UserProfileCreateProperties } from '../../users/entities/user-profile.entity';
import { NotAuthDecorator } from '../../../../nest-decorators/decorators/not-auth.decorator';
import { AccessToken, TokenData, WithAccessToken } from '../../tokens/entities/token.entity';
import { AuthService } from '../services/auth.service';
import { CurrentUser } from '../../../../nest-decorators/decorators/current-user.decorator';
import { UserService } from '../../users/services/user.service';

@Controller('auth')
export class AuthWebController {
    constructor(private readonly _authService: AuthService, private readonly _userService: UserService) {}

    @NotAuthDecorator()
    @Post('/registration')
    async registration(
        @Body() body: UserProfileCreateProperties & UserCreateProperties,
        // passthrough: true ставим для того чтобы логика неста на response не прервалась
        @Res({ passthrough: true }) response: Response,
    ): Promise<{ message: string }> {
        if (Object.keys(body).length === 0) {
            throw new BadRequestException('Отсутствует тело запроса');
        }

        await this._authService.registration(body);

        return { message: 'Регистрация прошла успешно. Ссылка отправлена на почту' };
    }

    @Get('/check')
    async checkUser(@CurrentUser() currentUser: TokenData): Promise<LargeUser> {
        return await this._userService.getUserById(currentUser.userId);
    }

    @NotAuthDecorator()
    @Post('/login')
    async login(
        @Body() body: UserCreateProperties,
        // passthrough: true ставим для того чтобы логика неста на response не прервалась
        @Res({ passthrough: true }) response: Response,
    ): Promise<LargeUser & WithAccessToken> {
        const { refreshToken, ...authData } = await this._authService.login(body);
        response.cookie('refreshToken', refreshToken, { httpOnly: true });

        return authData;
    }

    @Delete('/logout')
    async logout(
        // passthrough: true ставим для того чтобы логика неста на response не прервалась
        @Res({ passthrough: true }) response: Response,
        @Req() request: Request,
    ): Promise<{ message: string }> {
        const { authToken } = request.cookies;
        response.clearCookie('refreshToken');

        await this._authService.logout(authToken);

        return { message: 'OK' };
    }

    @NotAuthDecorator()
    @Get('/refresh')
    async refreshAccessToken(
        // passthrough: true ставим для того чтобы логика неста на response не прервалась
        @Res({ passthrough: true }) response: Response,
        @Req() request: Request,
    ): Promise<WithAccessToken> {
        const { refreshToken } = request.cookies;
        response.clearCookie('refreshToken');
        const newTokens = await this._authService.refreshAuthToken(refreshToken);

        response.cookie('refreshToken', newTokens?.refreshToken, { httpOnly: true });

        return { accessToken: newTokens.accessToken };
    }

    @NotAuthDecorator()
    @Get('/activate')
    async acceptEmail(@Query('key') key: AccessToken): Promise<{ message: string }> {
        if (!key) {
            throw new BadRequestException('Не указан обязательный параметр');
        }

        await this._authService.activateAccount(key);

        return { message: 'Почта успешно подтверждена' }
    }
}
