import { LargeRecord, Record, RecordId } from '../entities/record.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { UserId } from '../../users/entities/user.entity';
import { WithServiceItem } from '../../services-list/entities/service-item.entity';

export interface RecordsPort {
    saveRecord: (record: Record) => Promise<Record>;

    getRecordById: (recordId: RecordId) => Promise<LargeRecord>;

    getRecords: (query: QueryType) => Promise<ManyItem<LargeRecord>>;

    getNewRecords: (specialistId: UserId, query: QueryType) => Promise<ManyItem<LargeRecord>>;

    getRecordsForClientReport: (clientId: UserId, specialistId: UserId) => Promise<ManyItem<Record & WithServiceItem>>;

    getRecordsBySpecialistId: (specialistId: UserId, startDate: string, finishDate: string) => Promise<Array<Record & WithServiceItem>>;
}
