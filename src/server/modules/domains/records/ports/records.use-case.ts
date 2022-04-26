import {
    LargeRecord,
    Record,
    RecordCreateProperties,
    RecordId,
    RecordUpdateProperties,
} from '../entities/record.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { UserId } from '../../users/entities/user.entity';
import { ClientCreateProperties } from '../../clients/entities/client.entity';

export interface RecordsUseCase {
    createRecord: (properties: RecordCreateProperties & ClientCreateProperties) => Promise<Record>;

    updateRecord: (recordId: RecordId, properties: RecordUpdateProperties) => Promise<Record>;

    deleteRecord: (recordId: RecordId, userId: UserId) => Promise<Record>;

    getRecordsBySpecId: (specialistId: UserId, query?: QueryType) => Promise<ManyItem<LargeRecord>>;

    getRecords: (query: QueryType) => Promise<ManyItem<LargeRecord>>;

    getNewRecords: (specialistId: UserId, query: QueryType) => Promise<ManyItem<LargeRecord>>;
}