import { Module } from '@nestjs/common';
import { ServicesListService } from '../services/services-list.service';
import { ServiceListAdapterService } from '../services/adapters/service-list-adapter.service';
import { ServicesWebController } from './services-web.controller';

@Module({
    providers: [ServicesListService, ServiceListAdapterService],
    controllers: [ServicesWebController]
})
export class ServicesWebModule {}