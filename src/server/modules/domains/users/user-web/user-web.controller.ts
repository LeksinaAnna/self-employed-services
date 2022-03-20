import {Controller, Get, Inject, Param, UseGuards} from '@nestjs/common';
import { UserLogin } from '../entities/user.entity';
import { UserUseCase, UserUseCaseSymbol } from '../ports/user.use-case';
import {AuthGuard} from "../../../../nest-decorators/guards/auth.guards";

@Controller('users')
export class UserWebController {
    constructor(
        @Inject(UserUseCaseSymbol)
        private readonly _userService: UserUseCase,
    ) {}

    @UseGuards(AuthGuard)
    @Get('/:login')
    async getUsers(@Param('login') login: UserLogin) {
        return await this._userService.getUserByLogin(login);
    }
}
