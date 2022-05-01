import { Controller, Get, Query } from '@nestjs/common';
import { AdminReport, SpecialistReport } from '../entities/report.entity';
import { QueryType } from '../../../../../common/interfaces/common';
import { CurrentUser } from '../../../../nest-decorators/decorators/current-user.decorator';
import { TokenData } from '../../tokens/entities/token.entity';
import { Roles } from '../../../../nest-decorators/decorators/roles.decorator';
import { ReportService } from '../services/report.service';

@Controller('/report')
export  class ReportWebController {
    constructor(private readonly _reportService: ReportService) {
    }

    @Roles('ADMIN')
    @Get('/admin')
    getAdminReport(
        @Query() query: QueryType,
        @CurrentUser() currentUser: TokenData,
    ): Promise<AdminReport> {
        return this._reportService.adminReport(currentUser.userId, query);
    }

    @Roles('SPECIALIST')
    @Get('/specialist')
    getSpecialistReport(
        @Query() query: QueryType,
        @CurrentUser() currentUser: TokenData,
    ): Promise<SpecialistReport> {
        return this._reportService.specialistReport(currentUser.userId, query);
    }
}