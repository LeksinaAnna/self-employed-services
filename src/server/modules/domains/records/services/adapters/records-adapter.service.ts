import { Injectable } from '@nestjs/common';
import { Brackets, createQueryBuilder } from 'typeorm';
import { RecordsPort } from '../../ports/records.port';
import { ManyItem, QueryType } from '../../../../../../common/interfaces/common';
import { LargeRecord, Record, RecordId } from '../../entities/record.entity';
import { RecordOrmEntity } from '../../orm-entities/record.orm-entity';
import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';
import { UserId } from '../../../users/entities/user.entity';

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
        spec_id,
    }: QueryType): Promise<ManyItem<LargeRecord>> {
        const [items, count] = await createQueryBuilder(RecordOrmEntity, 'record')
            .where(qb => {
                if (start_date) {
                    qb.andWhere(`record.recordDate >= :startDate`, { startDate: start_date });
                }

                if (finish_date) {
                    qb.andWhere(`record.recordDate <= :finishDate`, { finishDate: finish_date });
                }

                if (spec_id) {
                    qb.andWhere(`record.specialistId = :specId`, { specId: spec_id });
                }

                if (search) {
                    qb.andWhere(`client.name ILIKE :value`, { value: `%${search}%` });
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
}
