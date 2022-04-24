import { Module } from '@nestjs/common';
import { RecordsService } from '../services/records.service';
import { RecordsAdapterService } from '../services/adapters/records-adapter.service';
import { ClientsService } from '../../clients/services/clients.service';
import { ClientsAdapterService } from '../../clients/services/adapters/clients-adapter.service';
import { RecordsWebController } from './records-web.controller';

@Module({
    providers: [RecordsService, RecordsAdapterService, ClientsService, ClientsAdapterService],
    controllers: [RecordsWebController],
})
export class RecordsModule {}