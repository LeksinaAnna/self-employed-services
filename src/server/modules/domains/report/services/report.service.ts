import { Injectable } from '@nestjs/common';
import { ReportUseCase } from '../ports/report.use-case';
import { UserId } from '../../users/entities/user.entity';
import { AdminReport, SpecialistReport } from '../entities/report.entity';
import { QueryType } from '../../../../../common/interfaces/common';
import { ReportAdapterService } from './adapters/report-adapter.service';

@Injectable()
export class ReportService implements ReportUseCase {
    constructor(private readonly _reportAdapter: ReportAdapterService) {}

    async adminReport(query: QueryType): Promise<AdminReport> {
        return await this._reportAdapter.getAdminReport(query);
    }

    async specialistReport(specId: UserId, query: QueryType): Promise<SpecialistReport> {
        return await this._reportAdapter.getSpecialistReport(specId, query);
    }
}
