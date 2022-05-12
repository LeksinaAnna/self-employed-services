import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Roles } from '../../../../nest-decorators/decorators/roles.decorator';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { NotAuthDecorator } from '../../../../nest-decorators/decorators/not-auth.decorator';
import {
    EmploymentSpecialist,
    Specialist,
    UserProfile,
    UserProfileUpdateProperties
} from '../entities/user-profile.entity';
import { CurrentUser } from '../../../../nest-decorators/decorators/current-user.decorator';
import { TokenData } from '../../tokens/entities/token.entity';
import { UserId } from '../entities/user.entity';

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
    ): Promise<ManyItem<Specialist>> {
        return await this._userService.getSpecialistsForUser(query);
    }

    @NotAuthDecorator()
    @Get('/specialists/:specialistId/employment')
    async getEmploymentSpecialist(
        @Query() query: QueryType,
        @Param('specialistId') specialistId: UserId,
    ): Promise<EmploymentSpecialist> {
        return await this._userService.getEmploymentOfSpecialist(specialistId, query);
    }

    @Patch('/my')
    async updateUserInfo(
        @CurrentUser() currentUser: TokenData,
        @Body() body: UserProfileUpdateProperties
    ): Promise<UserProfile> {
        return await this._userService.updateUserInfo(currentUser.userId, body);
    }
}
