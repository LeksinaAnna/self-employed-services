import { Injectable, NotFoundException } from '@nestjs/common';
import { RecordsUseCase } from '../ports/records.use-case';
import { Record, RecordCreateProperties, RecordEntity, RecordId } from '../entities/record.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { UserId } from '../../users/entities/user.entity';
import { RecordsAdapterService } from './adapters/records-adapter.service';

@Injectable()
export class RecordsService implements RecordsUseCase {
    constructor(private readonly _recordsAdapter: RecordsAdapterService) {}

    async createRecord(properties: RecordCreateProperties): Promise<Record> {
        const record = new RecordEntity({
            ...properties,
        });

        return await this._recordsAdapter.saveRecord(record);
    }

    async deleteRecord(recordId: RecordId, userId: UserId): Promise<Record> {
        const record = await this._recordsAdapter.getRecordById(recordId);

        if (!record) {
            throw new NotFoundException('Запись не найдена');
        }

        const updatedRecord = new RecordEntity({ ...record, inBasket: true });
        return await this._recordsAdapter.saveRecord(updatedRecord);
    }

    async getRecordsBySpecId(specialistId: UserId, query?: QueryType): Promise<ManyItem<Record>> {
        return await this._recordsAdapter.getRecords({ ...query, spec_id: specialistId });
    }

    async updateRecord(properties: RecordCreateProperties): Promise<Record> {
        const record = await this._recordsAdapter.getRecordById(properties.recordId);

        if (!record) {
            throw new NotFoundException('Запись не найдена');
        }

        const updatedRecord = new RecordEntity({ ...record, ...properties });
        return await this._recordsAdapter.saveRecord(updatedRecord);
    }

    async getRecords(query: QueryType): Promise<ManyItem<Record>> {
        return await this._recordsAdapter.getRecords(query);
    }
}
