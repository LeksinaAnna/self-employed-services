import { BadRequestException, Body, Controller, Inject, Post } from '@nestjs/common';
import { UserCreateProperties } from '../../users/entities/user.entity';
import { UserProfile, UserProfileCreateProperties } from '../../users/entities/user-profile.entity';
import { AuthUseCase, AuthUseCaseSymbol } from '../ports/auth.use-case';

@Controller('auth')
export class AuthWebController {
    constructor(
        @Inject(AuthUseCaseSymbol)
        private readonly _authService: AuthUseCase,
    ) {}

    @Post('/registration')
    async registration(@Body() body: UserProfileCreateProperties & UserCreateProperties): Promise<UserProfile> {
        if (Object.keys(body).length === 0) {
            throw new BadRequestException('Отсутствует тело запроса');
        }
        return await this._authService.registration(body);
    }

    // @Post('login')
    // async login(): Promise<UserProfile> {
    //
    // }
}
