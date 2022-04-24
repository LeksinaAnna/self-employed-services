import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RecordsService } from '../services/records.service';
import { Roles } from '../../../../nest-decorators/decorators/roles.decorator';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { Record, RecordCreateProperties, RecordId } from '../entities/record.entity';
import { NotAuthDecorator } from '../../../../nest-decorators/decorators/not-auth.decorator';
import { ClientCreateProperties } from '../../clients/entities/client.entity';
import { CurrentUser } from '../../../../nest-decorators/decorators/current-user.decorator';
import { TokenData } from '../../tokens/entities/token.entity';

@Controller('records')
export class RecordsWebController {
    constructor(private readonly _recordsService: RecordsService) {}

    @Roles('SPECIALIST')
    @Get('/')
    async getRecords(
        @Query() query: QueryType,
        @CurrentUser() currentUser: TokenData
    ): Promise<ManyItem<Record>> {
        return await this._recordsService.getRecords({
            ...query, spec_id: currentUser.userId
        });
    }

    @NotAuthDecorator()
    @Post('/')
    async createRecord(
        @Body() body: RecordCreateProperties & ClientCreateProperties,
    ): Promise<Record> {
        return await this._recordsService.createRecord(body);
    }

    @Patch('/:recordId')
    async updateRecord(
        @Param('recordId') recordId: RecordId,
        @Body() body: RecordCreateProperties,
    ): Promise<Record> {
        return await this._recordsService.updateRecord(recordId, body);
    }
}