import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { ServiceItem, ServiceItemCreateProperties, ServiceItemId } from '../entities/service-item.entity';
import { ServicesListService } from '../services/services-list.service';
import { Roles } from '../../../../nest-decorators/decorators/roles.decorator';
import { CurrentUser } from '../../../../nest-decorators/decorators/current-user.decorator';
import { TokenData } from '../../tokens/entities/token.entity';
import { NotAuthDecorator } from '../../../../nest-decorators/decorators/not-auth.decorator';

@Controller('services')
export class ServicesWebController {
    constructor(private readonly _servicesListService: ServicesListService) {}

    @NotAuthDecorator()
    @Get('/')
    async getServices(@Query() query: QueryType): Promise<ManyItem<ServiceItem>> {
        return await this._servicesListService.getServices(query);
    }

    @Roles('SPECIALIST')
    @Post('/')
    async createService(
        @Body() body: ServiceItemCreateProperties,
        @CurrentUser() currentUser: TokenData,
    ): Promise<ServiceItem> {
        return await this._servicesListService.createServiceItem({
            ...body,
            creator: currentUser.userId,
        });
    }

    @Roles('SPECIALIST')
    @Patch('/:serviceId')
    async updateService(
        @Param('serviceId') serviceId: ServiceItemId,
        @Body() body: ServiceItemCreateProperties,
        @CurrentUser() currentUser: TokenData,
    ): Promise<ServiceItem> {
        return await this._servicesListService.updateServiceItem(serviceId, {
            ...body,
            updater: currentUser.userId,
        });
    }

    @Roles('SPECIALIST', 'ADMIN')
    @Delete('/:serviceId')
    async deleteService(
        @Param('serviceId') serviceId: ServiceItemId,
        @CurrentUser() currentUser: TokenData,
    ): Promise<ServiceItem> {
        return await this._servicesListService.deleteServiceItem(serviceId, currentUser.userId);
    }
}
