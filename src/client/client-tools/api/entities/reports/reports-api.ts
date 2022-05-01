import { ApiBaseClient } from '../../api-client/api-client';
import { QueryType } from '../../../../../common/interfaces/common';
import { AdminReport, SpecialistReport } from '../../../../../server/modules/domains/report/entities/report.entity';

export class ReportsApi extends ApiBaseClient {
    private readonly prefix = '/api/v1/report';

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async getAdminReport(query: QueryType, signal?: AbortSignal): Promise<AdminReport> {
        return await this.get(`${this.prefix}/admin`, query, signal);
    }

    async getSpecialistReport(query: QueryType, signal?: AbortSignal): Promise<SpecialistReport> {
        return await this.get(`${this.prefix}/specialist`, query, signal);
    }
}