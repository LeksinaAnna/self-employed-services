import { Response, Request } from 'express';
import { BadRequestException, Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { LargeUser, UserCreateProperties } from '../../users/entities/user.entity';
import { UserProfile, UserProfileCreateProperties } from '../../users/entities/user-profile.entity';
import { NotAuthDecorator } from '../../../../nest-decorators/decorators/not-auth.decorator';
import { WithAccessToken } from '../../tokens/entities/token.entity';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthWebController {
    constructor(private readonly _authService: AuthService) {}

    @NotAuthDecorator()
    @Post('/registration')
    async registration(
        @Body() body: UserProfileCreateProperties & UserCreateProperties,
        // passthrough: true ставим для того чтобы логика неста на response не прервалась
        @Res({ passthrough: true }) response: Response,
    ): Promise<LargeUser> {
        if (Object.keys(body).length === 0) {
            throw new BadRequestException('Отсутствует тело запроса');
        }
        const { refreshToken, ...userData } = await this._authService.registration(body);
        response.cookie('refreshToken', refreshToken, { httpOnly: true });

        return userData;
    }

    @NotAuthDecorator()
    @Post('/login')
    async login(
        @Body() body: UserCreateProperties,
        // passthrough: true ставим для того чтобы логика неста на response не прервалась
        @Res({ passthrough: true }) response: Response,
    ): Promise<UserProfile & WithAccessToken> {
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
}
