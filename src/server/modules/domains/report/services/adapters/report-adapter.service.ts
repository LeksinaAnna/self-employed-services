import { Injectable } from '@nestjs/common';
import { createQueryBuilder } from 'typeorm';
import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';
import { UserId } from '../../../users/entities/user.entity';
import { RecordOrmEntity } from '../../../records/orm-entities/record.orm-entity';
import { ClientOrmEntity } from '../../../clients/orm-entities/client.orm-entity';
import { QueryType } from '../../../../../../common/interfaces/common';
import { AdminReport, ClientReport, SpecialistReport } from '../../entities/report.entity';
import { RoomOrmEntity } from '../../../rooms/orm-entities/room.orm-entity';

@Injectable()
export class ReportAdapterService extends PersistenceAdapter {
    constructor() {
        super();
    }

    async getAdminReport({ start_date, finish_date }: QueryType): Promise<AdminReport> {
        const roomsQb = createQueryBuilder(RoomOrmEntity, `room`)
            .select(`room.roomId`, 'roomId')
            .addSelect(`room.title`, `title`)
            .addSelect(`room.price`, `price`)
            .addSelect(`room.type`, `type`)
            // duration = у каждой аренды нам нужно вычислить разность дат, а потом их все сложить.
            // с помощью extract epoch получаем кол-во секунд, приводим к минутам разделив на 60.
            .addSelect(
                `COALESCE( SUM( EXTRACT( epoch FROM(rentals.finishDate - rentals.startDate) )/60 ), 0)`,
                `duration`,
            )
            .addSelect(`COUNT(rentals)::integer`, `countRental`)
            .addSelect(`COALESCE( SUM( EXTRACT( epoch FROM(rentals.finishDate - rentals.startDate) )/60 * room.price/60 ), 0)`, `profit`)
            .leftJoin(
                'room.rentals',
                'rentals',
                'rentals.inBasket = false AND rentals.startDate >= :startDate AND rentals.finishDate <= :finishDate',
            )
            .setParameters({ startDate: start_date, finishDate: finish_date })
            .groupBy(`room.roomId`);

        const locations = await roomsQb.getRawMany();

        // getRaw используется, когда нужно получить сложные вычисления,
        // но ORM их сама с entity сопоставить не может

        let profit = 0;
        locations.forEach(item => profit += item.profit);

        return { locations, profit };
    }

    async getSpecialistReport(
        specialistId: UserId,
        { start_date, finish_date, search = '', take = '10', skip = '0' }: QueryType,
    ): Promise<SpecialistReport> {
        const clientsReport = await this.clientsReport(specialistId, { start_date, finish_date, skip, take, search });

        const statsQb = createQueryBuilder(RecordOrmEntity, 'record')
            .where(`record.specialistId = :specialistId AND record.status = 'accepted'`, { specialistId })
            .select(`COUNT(record)::integer`, 'countRecords')
            .addSelect(`COALESCE( SUM(service.price), 0 )`, 'income')
            .addSelect(`COALESCE( SUM( (room.price / 60) * (service.duration / (1000 * 60) ) ), 0 )`, 'expenses')
            .addSelect(
                `COALESCE( SUM(service.price - ((room.price / 60) * (service.duration / (1000 * 60) )) ), 0)`,
                'profit',
            )
            .leftJoin(`record.service`, 'service')
            .leftJoin(`record.room`, 'room');

        if (start_date && finish_date) {
            statsQb.andWhere(`record.recordDate <= :finishDate AND record.recordDate >= :startDate`);
            statsQb.setParameters({ startDate: start_date, finishDate: finish_date });
        }

        const stats = await statsQb.getRawOne();

        return { ...stats, clients: clientsReport };
    }

    async clientsReport(
        specialistId: UserId,
        { start_date, finish_date, search = '', take = '10', skip = '0' }: QueryType,
    ): Promise<ClientReport[]> {
        const clientsReportQb = createQueryBuilder(ClientOrmEntity, 'client')
            .where(`record.specialistId = :specialistId AND record.status = 'accepted'`, { specialistId })
            .select('COUNT(record)::integer', 'servicesCount')
            .addSelect('client.name', 'name')
            .addSelect('SUM(service.price - ((room.price / 60) * (service.duration / (1000 * 60) )) )', 'profit')
            .leftJoin('client.records', 'record')
            .leftJoin('record.service', 'service')
            .leftJoin('record.room', 'room')
            .groupBy('client.name')
            .limit(parseInt(take, 10))
            .offset(parseInt(skip, 10));

        if (start_date && finish_date) {
            clientsReportQb.andWhere(`record.recordDate <= :finishDate AND record.recordDate >= :startDate`);
            clientsReportQb.setParameters({ startDate: start_date, finishDate: finish_date });
        }

        if (search) {
            clientsReportQb.andWhere('client.name ILIKE :value', { value: `%${search}%` });
        }

        return await clientsReportQb.getRawMany();
    }
}
