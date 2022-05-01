import { UserId } from '../../users/entities/user.entity';
import { AdminReport, SpecialistReport } from '../entities/report.entity';
import { QueryType } from '../../../../../common/interfaces/common';

export interface ReportUseCase {
    adminReport: (userId: UserId, query: QueryType) => Promise<AdminReport>;
    specialistReport: (specId: UserId, query: QueryType) => Promise<SpecialistReport>;
}