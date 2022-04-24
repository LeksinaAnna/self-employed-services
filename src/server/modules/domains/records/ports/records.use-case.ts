import { Record, RecordCreateProperties, RecordId } from '../entities/record.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { UserId } from '../../users/entities/user.entity';
import { ClientCreateProperties } from '../../clients/entities/client.entity';

export interface RecordsUseCase {
    createRecord: (properties: RecordCreateProperties & ClientCreateProperties) => Promise<Record>;

    updateRecord: (recordId: RecordId, properties: RecordCreateProperties) => Promise<Record>;

    deleteRecord: (recordId: RecordId, userId: UserId) => Promise<Record>;

    getRecordsBySpecId: (specialistId: UserId, query?: QueryType) => Promise<ManyItem<Record>>;

    getRecords: (query: QueryType) => Promise<ManyItem<Record>>;
}