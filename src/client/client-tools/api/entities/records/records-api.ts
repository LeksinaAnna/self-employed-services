import { ApiBaseClient } from '../../api-client/api-client';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import {
    LargeRecord,
    Record,
    RecordCreateProperties,
    RecordId, RecordUpdateProperties,
} from '../../../../../server/modules/domains/records/entities/record.entity';
import { ClientCreateProperties } from '../../../../../server/modules/domains/clients/entities/client.entity';

export class RecordsApi extends ApiBaseClient {
    private readonly prefix = '/api/v1/records';

    constructor(baseUrl) {
        super(baseUrl);
    }

    async getMyRecords(query?: QueryType, signal?: AbortSignal): Promise<ManyItem<LargeRecord>> {
        return await this.get(`${this.prefix}/my`, query, signal);
    }

    async getNewRecords(query?: QueryType, signal?: AbortSignal): Promise<ManyItem<Record>> {
        return await this.get(`${this.prefix}/new`, query, signal);
    }

    async createRecord(
        properties: RecordCreateProperties & ClientCreateProperties,
        signal?: AbortSignal,
    ): Promise<Record> {
        return await this.post(`${this.prefix}`, properties, signal);
    }

    async updateRecord(recordId: RecordId, properties: RecordUpdateProperties, signal?: AbortSignal): Promise<Record> {
        return await this.patch(`${this.prefix}/${recordId}`, properties, signal);
    }
}
