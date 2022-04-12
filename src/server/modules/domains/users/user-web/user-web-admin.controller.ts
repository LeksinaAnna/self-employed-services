import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { Roles } from '../../../../nest-decorators/decorators/roles.decorator';
import { UserService } from '../services/user.service';
import { LargeUser, UserId, UserUpdateProperties, UserWithDescription } from '../entities/user.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { CurrentUser } from '../../../../nest-decorators/decorators/current-user.decorator';
import { TokenData } from '../../tokens/entities/token.entity';

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

    @Patch('/:userId')
    async updateSpecialist(
        @Param('userId') specialistId: UserId,
        @Body() body: UserUpdateProperties,
        @CurrentUser() currentUser: TokenData,
    ): Promise<LargeUser & UserWithDescription> {
        return await this._userService.updateSpecialist({ ...body, updater: currentUser.userId }, specialistId);
    }
}