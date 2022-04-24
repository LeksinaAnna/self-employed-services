import { Record, RecordId } from '../entities/record.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { UserId } from '../../users/entities/user.entity';

export interface RecordsPort {
    saveRecord: (record: Record) => Promise<Record>;

    getRecordById: (recordId: RecordId) => Promise<Record>;

    getRecords: (query: QueryType) => Promise<ManyItem<Record>>;

    getNewRecords: (specialistId: UserId, query: QueryType) => Promise<ManyItem<Record>>;
}