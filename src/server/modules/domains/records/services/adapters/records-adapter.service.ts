import { Injectable } from '@nestjs/common';
import { createQueryBuilder } from 'typeorm';
import { RecordsPort } from '../../ports/records.port';
import { ManyItem, QueryType } from '../../../../../../common/interfaces/common';
import { Record, RecordId } from '../../entities/record.entity';
import { RecordOrmEntity } from '../../orm-entities/record.orm-entity';

@Injectable()
export class RecordsAdapterService implements RecordsPort {
    async getRecords(query: QueryType): Promise<ManyItem<Record>> {
        return Promise.resolve(undefined);
    }

    async saveRecord(record: Record): Promise<Record> {
        return Promise.resolve(undefined);
    }

    async getRecordById(recordId: RecordId): Promise<Record> {
        return await createQueryBuilder(RecordOrmEntity, 'record')
            .where(`record.recordId = :recoredId`, { recordId })
            .getOne();
    }



}