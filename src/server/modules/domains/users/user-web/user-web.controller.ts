import { Controller, Get, Param } from '@nestjs/common';
import { LargeUser, UserEmail } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserWebController {
    constructor(
        private readonly _userService: UserService,
    ) {}

    @Get('/:login')
    async getUsers(@Param('login') login: UserEmail): Promise<LargeUser> {
        return await this._userService.getUserByLogin(login);
    }
}
