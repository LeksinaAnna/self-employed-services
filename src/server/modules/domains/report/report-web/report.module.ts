import { Module } from '@nestjs/common';
import { ReportAdapterService } from '../services/adapters/report-adapter.service';
import { ReportService } from '../services/report.service';
import { ReportWebController } from './report-web.controller';

@Module({
    imports: [],
    providers: [ReportAdapterService, ReportService],
    controllers: [ReportWebController],
})
export class ReportModule {}
