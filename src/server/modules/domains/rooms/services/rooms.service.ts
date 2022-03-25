import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomsUseCase } from '../ports/rooms.use-case';
import { Room, RoomCreateProperties, RoomEntity, RoomId } from '../entities/room.entity';
import { UserId } from '../../users/entities/user.entity';
import { ManyItem, QueryType, WithCreator } from '../../../../../common/interfaces/common';
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

    async deleteRoom(id: RoomId, creator: UserId): Promise<Room> {
        const room = await this._roomsAdapter.getRoomById(id);
        const updatedEntity = new RoomEntity({ ...room, inBasket: true, modifiedBy: creator });

        return await this._roomsAdapter.saveRoom(updatedEntity);
    }

    async getRoomsByCreatorId(id: UserId, query?: QueryType): Promise<ManyItem<Room>> {
        return await this._roomsAdapter.getRoomsByCreatorId(id, query);
    }

    async updateRoom(properties: RoomCreateProperties & WithCreator): Promise<Room> {
        const room = await this._roomsAdapter.getRoomById(properties.roomId);
        if (!room) {
            throw new NotFoundException('Группа, которую вы хотите обновить не найдена.');
        }

        const updatedEntity = new RoomEntity({ ...room, ...properties, modifiedBy: properties.creator });

        return await this._roomsAdapter.saveRoom(updatedEntity);
    }

    async getRooms(query?: QueryType): Promise<ManyItem<Room>> {
        return this._roomsAdapter.getRooms(query);
    }
}
