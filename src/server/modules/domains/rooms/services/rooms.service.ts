import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomsUseCase } from '../ports/rooms.use-case';
import { Room, RoomCreateProperties, RoomEntity, RoomId } from '../entities/room.entity';
import { UserId } from '../../users/entities/user.entity';
import { ManyItem, QueryType, WithCreator, WithUpdater } from '../../../../../common/interfaces/common';
import { RoomsAdapterService } from './adapters/rooms-adapter.service';

@Injectable()
export class RoomsService implements RoomsUseCase {
    constructor(private readonly _roomsAdapter: RoomsAdapterService) {}

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

    async getRooms(query?: QueryType): Promise<ManyItem<Room>> {
        return this._roomsAdapter.getRooms(query);
    }
}
