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
import { UserProfileAdapterService } from '../../users/services/adapters/user-profile-adapter.service';
import { RecordsAdapterService } from './adapters/records-adapter.service';

@Injectable()
export class RecordsService implements RecordsUseCase {
    constructor(
        private readonly _recordsAdapter: RecordsAdapterService,
        private readonly _clientService: ClientsService,
        private readonly _userProfileAdapter: UserProfileAdapterService
    ) {}

    async createRecord(properties: RecordCreateProperties & ClientCreateProperties): Promise<Record> {
        // Создаем клиента в БД
        const client = await this._clientService.createClient(properties);

        // Получаем специалиста, чтобы в дальнейшем взять у него selected_room
        const specialist = await this._userProfileAdapter.getProfileByUserId(properties.specialistId);

        if (!specialist) {
            throw new NotFoundException('Специалист не найден')
        }

        const record = new RecordEntity({
            ...properties,
            clientId: client.clientId,
            roomId: specialist.selectedRoom,
        });

        return await this._recordsAdapter.saveRecord(record);
    }

    async deleteRecord(recordId: RecordId, userId: UserId): Promise<Record> {
        const record = await this._recordsAdapter.getRecordById(recordId);

        if (!record) {
            throw new NotFoundException('Запись не найдена');
        }

        const updatedRecord = new RecordEntity({...record, inBasket: true});
        return await this._recordsAdapter.saveRecord(updatedRecord);
    }

    async getRecordsBySpecId(specialistId: UserId, query?: QueryType): Promise<ManyItem<LargeRecord>> {
        return await this._recordsAdapter.getRecords({...query, spec_id: specialistId});
    }

    async updateRecord(recordId: RecordId, properties: RecordUpdateProperties): Promise<Record> {
        const record = await this._recordsAdapter.getRecordById(recordId);

        if (!record) {
            throw new NotFoundException('Запись не найдена');
        }

        const updatedRecord = new RecordEntity({...record, ...properties});

        return await this._recordsAdapter.saveRecord(updatedRecord);
    }

    async getRecords(query: QueryType): Promise<ManyItem<LargeRecord>> {
        return await this._recordsAdapter.getRecords(query);
    }

    async getNewRecords(specialistId: UserId, query: QueryType): Promise<ManyItem<LargeRecord>> {
        return await this._recordsAdapter.getNewRecords(specialistId, query);
    }
}
