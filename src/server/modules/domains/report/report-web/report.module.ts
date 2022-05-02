import { Module } from '@nestjs/common';
import { ReportService } from '../services/report.service';
import { ClientsService } from '../../clients/services/clients.service';
import { UserWebModule } from '../../users/user-web/user-web.module';
import { ClientsAdapterService } from '../../clients/services/adapters/clients-adapter.service';
import { RoomsWebModule } from '../../rooms/rooms-web/rooms-web.module';
import { RecordsModule } from '../../records/records-web/records.module';
import { ReportWebController } from './report-web.controller';

@Module({
    imports: [UserWebModule, RoomsWebModule, RecordsModule],
    providers: [ReportService, ClientsService, ClientsAdapterService],
    controllers: [ReportWebController],
})
export class ReportModule {}
