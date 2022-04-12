import { Controller, Get, Query } from '@nestjs/common';
import { LargeUser } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { Roles } from '../../../../nest-decorators/decorators/roles.decorator';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { NotAuthDecorator } from '../../../../nest-decorators/decorators/not-auth.decorator';

@Roles('SPECIALIST')
@Controller('users')
export class UserWebController {
    constructor(
        private readonly _userService: UserService,
    ) {}

    @NotAuthDecorator()
    @Get('/specialists')
    async getSpecialists(
        @Query() query: QueryType,
    ): Promise<ManyItem<LargeUser>> {
        return await this._userService.getSpecialists(query);
    }
}
