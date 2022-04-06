import { createQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoomsPort } from '../../ports/rooms.port';
import { UserId } from '../../../users/entities/user.entity';
import { Room, RoomId } from '../../entities/room.entity';
import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';
import { RoomOrmEntity } from '../../orm-entities/room.orm-entity';
import { ManyItem, QueryType } from '../../../../../../common/interfaces/common';
import { WithRentals } from '../../../rentals/entities/rental.entity';

@Injectable()
export class RoomsAdapterService extends PersistenceAdapter implements RoomsPort {
    constructor() {
        super();
    }

    async getRoomsByCreatorId(
        id: UserId,
        { take = '10', skip = '0', search = '' }: QueryType,
    ): Promise<ManyItem<Room>> {
        const [items, count] = await createQueryBuilder(RoomOrmEntity, 'room')
            .where(`room.createdBy = :id`, { id })
            .andWhere(qb => {
                if (search) {
                    qb.andWhere(`room.title ILIKE :value`, { value: `%${search}%` });
                }
            })
            .leftJoinAndSelect(`room.rentals`, 'rental')
            .take(parseInt(take, 10))
            .skip(parseInt(skip, 10))
            .getManyAndCount();

        return { items, count };
    }

    async saveRoom(properties: Room): Promise<Room> {
        return await this._entityManager.save(RoomOrmEntity, properties);
    }

    async getRoomById(id: RoomId): Promise<Room> {
        return await createQueryBuilder(RoomOrmEntity, 'room')
            .where(`room.roomId = :roomId`, { roomId: id })
            .andWhere(`room.inBasket != true`)
            .leftJoinAndSelect(`room.rentals`, 'rental')
            .getOne();
    }

    async getRooms({
        take = '10',
        skip = '0',
        search,
        type,
        start_date,
        finish_date,
    }: QueryType): Promise<ManyItem<Room & WithRentals>> {
        const [items, count] = await createQueryBuilder(RoomOrmEntity, 'room')
            .where(qb => {
                if (search) {
                    qb.andWhere(`room.title ILIKE :value`, { value: `%${search}%` });
                }
                if (type) {
                    qb.andWhere(`room.type = :type`, { type });
                }
            })
            .leftJoinAndSelect(
                `room.rentals`,
                'rental',
                'rental.startDate >= :startDate AND rental.finishDate <= :finishDate',
                {
                    startDate: start_date,
                    finishDate: finish_date,
                },
            )
            .take(parseInt(take, 10))
            .skip(parseInt(skip, 10))
            .getManyAndCount();

        return { items, count };
    }
}
