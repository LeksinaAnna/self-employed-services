import { Injectable, NotFoundException } from '@nestjs/common';
import { RecordsUseCase } from '../ports/records.use-case';
import {
    LargeRecord,
    Record,
    RecordCreateProperties,
    RecordEntity,
    RecordId,
    RecordUpdateProperties,
} from '../entities/record.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { UserId } from '../../users/entities/user.entity';
import { ClientCreateProperties } from '../../clients/entities/client.entity';
import { ClientsService } from '../../clients/services/clients.service';
import { RecordsAdapterService } from './adapters/records-adapter.service';

@Injectable()
export class RecordsService implements RecordsUseCase {
    constructor(private readonly _recordsAdapter: RecordsAdapterService, private readonly _clientService: ClientsService) {}

    async createRecord(properties: RecordCreateProperties & ClientCreateProperties): Promise<Record> {
        const client = await this._clientService.createClient(properties);

        const record = new RecordEntity({
            ...properties,
            clientId: client.clientId,
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

    async getRecordsBySpecId(specialistId: UserId, query?: QueryType): Promise<ManyItem<LargeRecord>> {
        return await this._recordsAdapter.getRecords({ ...query, spec_id: specialistId });
    }

    async updateRecord(recordId: RecordId, properties: RecordUpdateProperties): Promise<Record> {
        const record = await this._recordsAdapter.getRecordById(recordId);

        if (!record) {
            throw new NotFoundException('Запись не найдена');
        }

        const updatedRecord = new RecordEntity({ ...record, ...properties });

        return await this._recordsAdapter.saveRecord(updatedRecord);
    }

    async getRecords(query: QueryType): Promise<ManyItem<LargeRecord>> {
        return await this._recordsAdapter.getRecords(query);
    }

    async getNewRecords(specialistId: UserId, query: QueryType): Promise<ManyItem<LargeRecord>> {
        return await this._recordsAdapter.getNewRecords(specialistId, query);
    }
}
