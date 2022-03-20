import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UserLogin } from '../entities/user.entity';
import { UserUseCase, UserUseCaseSymbol } from '../ports/user.use-case';

@Controller('users')
export class UserWebController {
    constructor(
        @Inject(UserUseCaseSymbol)
        private readonly _userService: UserUseCase,
    ) {}

    @Get('/:login')
    async getUsers(@Param('login') login: UserLogin) {
        return await this._userService.getUserByLogin(login);
    }
}
