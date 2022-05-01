import { Module } from '@nestjs/common';
import { ReportService } from '../services/report.service';
import { RoomsService } from '../../rooms/services/rooms.service';
import { RoomsAdapterService } from '../../rooms/services/adapters/rooms-adapter.service';
import { ReportWebController } from './report-web.controller';

@Module({
    providers: [ReportService, RoomsService, RoomsAdapterService],
    controllers: [ReportWebController]
})
export class ReportModule {}