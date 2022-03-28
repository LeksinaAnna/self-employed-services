import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RecordsService } from '../services/records.service';
import { Roles } from '../../../../nest-decorators/decorators/roles.decorator';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { Record, RecordCreateProperties } from '../entities/record.entity';
import { NotAuthDecorator } from '../../../../nest-decorators/decorators/not-auth.decorator';

@Controller('records')
export class RecordsWebController {
    constructor(private readonly _recordsService: RecordsService) {}

    @Roles('SPECIALIST')
    @Get('/')
    async getRecords(
        @Query() query: QueryType,
    ): Promise<ManyItem<Record>> {
        return await this._recordsService.getRecords(query);
    }

    @NotAuthDecorator()
    @Post('/')
    async createRecord(
        @Body() body: RecordCreateProperties,
    ): Promise<Record> {
        return await this._recordsService.createRecord(body);
    }
}