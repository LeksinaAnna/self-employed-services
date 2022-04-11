import { Brackets, createQueryBuilder } from 'typeorm';
import moment from 'moment';
import { Injectable } from '@nestjs/common';
import { RentalsPort } from '../../ports/rentals.port';
import { ManyItem, QueryType } from '../../../../../../common/interfaces/common';
import { Rental, RentalId } from '../../entities/rental.entity';
import { RoomId } from '../../../rooms/entities/room.entity';
import { RentalOrmEntity } from '../../orm-entities/rental.orm-entity';
import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';
import { UserId } from '../../../users/entities/user.entity';

@Injectable()
export class RentalsAdapterService extends PersistenceAdapter implements RentalsPort {
    constructor() {
        super();
    }

    async getRentals({
        take = '10',
        skip = '0',
        start_date,
        room_id,
        spec_id,
        finish_date,
    }: QueryType): Promise<ManyItem<Rental>> {
        const [items, count] = await createQueryBuilder(RentalOrmEntity, 'rental')
            .where(
                new Brackets(qb => {
                    qb.andWhere(`rental.inBasket != true`);

                    if (start_date) {
                        qb.andWhere(`rental.startDate >= :startDate`, { startDate: start_date });
                    }
                    if (finish_date) {
                        qb.andWhere(`rental.finishDate <= :finishDate`, { finishDate: finish_date });
                    }
                    if (spec_id) {
                        qb.andWhere(`rental.specialistId = :specialistId`, { specialistId: spec_id });
                    }
                    if (room_id) {
                        qb.andWhere(`rental.roomId = :roomId`, { roomId: room_id });
                    }
                }),
            )
            .take(parseInt(take, 10))
            .skip(parseInt(skip, 10))
            .getManyAndCount();

        return { items, count };
    }

    async saveRental(rental: Rental): Promise<Rental> {
        return await this._entityManager.save(RentalOrmEntity, rental);
    }

    async getRentalsByRoomId(
        roomId: RoomId,
        { start_date = moment().format('YYYY-MM-DD'), finish_date = '' }: QueryType,
    ): Promise<Rental> {
        return await createQueryBuilder(RentalOrmEntity, 'rental')
            .where(`rental.roomId = :roomId`, { roomId })
            .andWhere(qb => {
                if (start_date) {
                    qb.andWhere(`rental.startDate >= :startDate`, { startDate: start_date });
                }

                if (finish_date) {
                    qb.andWhere(`rental.finishDate <= :finishDate`, { finishDate: finish_date });
                }
            })
            .andWhere(`rental.inBasket != true`)
            .getOne();
    }

    async getRentalById(rentalId: RentalId): Promise<Rental> {
        return await createQueryBuilder(RentalOrmEntity, 'rental')
            .where(`rental.rentalId = :rentalId`, { rentalId })
            .andWhere(`rental.inBasket != true`)
            .getOne();
    }

    async getRentalsBySpecId(specialistId: UserId, roomId?: RoomId): Promise<ManyItem<Rental>> {
        const [items, count] = await createQueryBuilder(RentalOrmEntity, 'rental')
            .where(`rental.specialistId = :specialistId`, { specialistId })
            .andWhere(qb => {
                if (roomId) {
                    qb.andWhere(`rental.roomId = :roomId`, { roomId });
                }
            })
            .getManyAndCount();
        return { items, count };
    }

    async isRentalByDates(startDate: string, finishDate: string, roomId: RoomId): Promise<Rental[]> {
        return await createQueryBuilder(RentalOrmEntity, 'rental')
            .where(`rental.roomId = :roomId`, { roomId })
            .andWhere(
                new Brackets(qb => {
                    qb.where(`rental.startDate <= :startDate AND rental.finishDate > :startDate`, { startDate });
                    qb.orWhere(`rental.startDate >= :startDate AND rental.startDate < :finishDate`, {
                        startDate,
                        finishDate,
                    });
                }),
            )
            .andWhere(`rental.inBasket = false`)
            .getMany();
    }
}
