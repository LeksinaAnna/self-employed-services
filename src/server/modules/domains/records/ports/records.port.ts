import { Record, RecordId } from '../entities/record.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';

export interface RecordsPort {
    saveRecord(record: Record): Promise<Record>;

    getRecordById(recordId: RecordId): Promise<Record>;

    getRecords(query: QueryType): Promise<ManyItem<Record>>;
}