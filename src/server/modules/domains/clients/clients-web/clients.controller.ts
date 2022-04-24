import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { Roles } from '../../../../nest-decorators/decorators/roles.decorator';
import { ClientsService } from '../services/clients.service';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { Client, ClientCreateProperties, ClientId } from '../entities/client.entity';
import { CurrentUser } from '../../../../nest-decorators/decorators/current-user.decorator';
import { TokenData } from '../../tokens/entities/token.entity';

@Roles('SPECIALIST')
@Controller('clients')
export class ClientsController {
    constructor(private readonly _clientService: ClientsService) {}

    @Get('/my')
    async getClients(@Query() query: QueryType, @CurrentUser() currentUser: TokenData): Promise<ManyItem<Client>> {
        return await this._clientService.getClientsBySpecialistId(currentUser.userId, query);
    }

    @Patch('/:clientId')
    async updateClient(
        @Param('clientId') clientId: ClientId,
        @CurrentUser() currentUser: TokenData,
        @Body() body: ClientCreateProperties,
    ): Promise<Client> {
        return await this._clientService.updateClient(clientId, { ...body, updater: currentUser.userId });
    }
}