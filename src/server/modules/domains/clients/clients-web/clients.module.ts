import { Module } from '@nestjs/common';
import { ClientsAdapterService } from '../services/adapters/clients-adapter.service';
import { ClientsService } from '../services/clients.service';
import { ClientsController } from './clients.controller';

@Module({
    providers: [ClientsService, ClientsAdapterService],
    controllers: [ClientsController]
})
export class ClientsModule {}