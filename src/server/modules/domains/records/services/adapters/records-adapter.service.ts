import { Injectable } from '@nestjs/common';
import { Brackets, createQueryBuilder } from 'typeorm';
import { RecordsPort } from '../../ports/records.port';
import { ManyItem, QueryType } from '../../../../../../common/interfaces/common';
import { LargeRecord, Record, RecordId } from '../../entities/record.entity';
import { RecordOrmEntity } from '../../orm-entities/record.orm-entity';
import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';
import { UserId } from '../../../users/entities/user.entity';
import { WithServiceItem } from '../../../services-list/entities/service-item.entity';

@Injectable()
export class RecordsAdapterService extends PersistenceAdapter implements RecordsPort {
    constructor() {
        super();
    }

    async getRecords({
        take = '10',
        skip = '0',
        search = '',
        start_date,
        finish_date,
        status,
        spec_id,
        client_id,
    }: QueryType): Promise<ManyItem<LargeRecord>> {
        const [items, count] = await createQueryBuilder(RecordOrmEntity, 'record')
            .where(qb => {
                // Если придет начальная дата, то смотрим на нее
                if (start_date) {
                    qb.andWhere(`record.recordDate >= :startDate`, { startDate: start_date });
                }

                // Если придет конечная дата, то смотрим на нее
                if (finish_date) {
                    qb.andWhere(`record.recordDate <= :finishDate`, { finishDate: finish_date });
                }

                // Если в параметрах придет Id специалиста, то будем искать по нему
                if (spec_id) {
                    qb.andWhere(`record.specialistId = :specId`, { specId: spec_id });
                }

                // Если придет параметр поиска, то будем искать по имени клиента
                if (search) {
                    qb.andWhere(`client.name ILIKE :value`, { value: `%${search}%` });
                }

                // Если придет статус записи, то смотрим на него
                if (status) {
                    qb.andWhere(`record.status = :status`, { status });
                }

                if (client_id) {
                    qb.andWhere(`client.clientId = :clientId`, { clientId: client_id });
                }
            })
            .leftJoinAndSelect(`record.client`, 'client')
            .leftJoinAndSelect(`record.service`, 'service')
            .orderBy(`record.status`, 'DESC')
            .take(parseInt(take, 10))
            .skip(parseInt(skip, 10))
            .getManyAndCount();

        return { items, count };
    }

    async saveRecord(record: Record): Promise<Record> {
        return await this._entityManager.save(RecordOrmEntity, record);
    }

    async getRecordById(recordId: RecordId): Promise<LargeRecord> {
        return await createQueryBuilder(RecordOrmEntity, 'record')
            .where(`record.recordId = :recordId`, { recordId })
            .getOne();
    }

    async getNewRecords(
        specialistId: UserId,
        { take = '10', skip = '0', search }: QueryType,
    ): Promise<ManyItem<LargeRecord>> {
        const [items, count] = await createQueryBuilder(RecordOrmEntity, 'record')
            .where(`record.specialistId = :specialistId`, { specialistId })
            .andWhere(`record.status = 'sent'`)
            .andWhere(
                new Brackets(qb => {
                    if (search) {
                        qb.andWhere(`client.name ILIKE :value`, { value: `%${search}%` });
                    }
                }),
            )
            .leftJoinAndSelect(`record.client`, 'client')
            .take(parseInt(take, 10))
            .skip(parseInt(skip, 10))
            .getManyAndCount();

        return { items, count };
    }

    async getRecordsForClientReport(
        clientId: UserId,
        specialistId: UserId,
    ): Promise<ManyItem<Record & WithServiceItem>> {
        const [items, count] = await createQueryBuilder(RecordOrmEntity, 'record')
            .where(`record.status = 'accepted'`)
            .andWhere(`record.clientId = :clientId`, { clientId })
            .leftJoinAndSelect(`record.service`, `service`)
            .andWhere(`service.createdBy = :specialistId`, { specialistId })
            .getManyAndCount();

        return { items, count };
    }
}
