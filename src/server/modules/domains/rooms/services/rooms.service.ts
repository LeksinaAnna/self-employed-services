import { Injectable, NotFoundException } from '@nestjs/common';
import moment from 'moment';
import { RoomsUseCase } from '../ports/rooms.use-case';
import { RoomWithProfit, Room, RoomCreateProperties, RoomEntity, RoomId } from '../entities/room.entity';
import { UserId } from '../../users/entities/user.entity';
import { ManyItem, QueryType, WithCreator, WithUpdater } from '../../../../../common/interfaces/common';
import { LargeRental, WithRentals } from '../../rentals/entities/rental.entity';
import { RoomsAdapterService } from './adapters/rooms-adapter.service';

@Injectable()
export class RoomsService implements RoomsUseCase {
    constructor(private readonly _roomsAdapter: RoomsAdapterService) {}

    private static calculateProfit(rental: LargeRental, price: number): number {
        const diff = moment(rental.finishDate).diff(rental.startDate) / (1000 * 60); // Разница в минутах
        const pricePerMinute = price / 60;

        return diff * pricePerMinute;
    }

    async getProfit(query: QueryType): Promise<RoomWithProfit[]> {
        const rooms = await this.getRooms({ take: '50', ...query });

        return rooms.items.map(room => {
            // Получаем массив с профитом по каждой аренде
            const calculatedProfits = room.rentals.map(rental => RoomsService.calculateProfit(rental, room.price));

            // складываем все числа между собой и получаем итоговый профит по комнате
            const calculateProfit = calculatedProfits.reduce((prev, current) => prev + current, 0);

            const profitEntity: RoomWithProfit = {
                type: room.type,
                roomId: room.roomId,
                countRental: room.rentals.length,
                price: room.price,
                title: room.title,
                profit: Math.round(calculateProfit) // Округляем число к ближайшему 22.51 = 23, 22.49 = 22
            }

            return profitEntity
        });

    }

    async getRoomById(roomId: RoomId): Promise<Room> {
        return await this._roomsAdapter.getRoomById(roomId);
    }

    async createRoom(properties: RoomCreateProperties & WithCreator): Promise<Room> {
        const roomEntity = new RoomEntity({
            ...properties,
            createdBy: properties.creator,
            modifiedBy: properties.creator,
        });

        return await this._roomsAdapter.saveRoom(roomEntity);
    }

    async deleteRoom(id: RoomId, updater: UserId): Promise<Room> {
        const room = await this._roomsAdapter.getRoomById(id);
        const updatedEntity = new RoomEntity({ ...room, inBasket: true, modifiedBy: updater });

        return await this._roomsAdapter.saveRoom(updatedEntity);
    }

    async getRoomsByCreatorId(id: UserId, query?: QueryType): Promise<ManyItem<Room>> {
        return await this._roomsAdapter.getRoomsByCreatorId(id, query);
    }

    async updateRoom(roomId: RoomId, properties: RoomCreateProperties & WithUpdater): Promise<Room> {
        const room = await this._roomsAdapter.getRoomById(roomId);
        if (!room) {
            throw new NotFoundException('Группа, которую вы хотите обновить не найдена.');
        }

        const updatedEntity = new RoomEntity({ ...room, ...properties, modifiedBy: properties.updater });

        return await this._roomsAdapter.saveRoom(updatedEntity);
    }

    async getRooms(query?: QueryType): Promise<ManyItem<Room & WithRentals>> {
        return this._roomsAdapter.getRooms(query);
    }
}
