import { Controller, Get, Query } from '@nestjs/common';
import { Roles } from '../../../../nest-decorators/decorators/roles.decorator';
import { UserService } from '../services/user.service';
import { LargeUser, UserWithDescription } from '../entities/user.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';

@Roles('ADMIN')
@Controller('/admin/users')
export class UserWebAdminController {
    constructor(
        private readonly _userService: UserService,
    ) {}

    @Get('/')
    async getSpecialists(
        @Query() query: QueryType,
    ): Promise<ManyItem<LargeUser & UserWithDescription>> {
        return await this._userService.getSpecialistsWithDescription(query);
    }
}