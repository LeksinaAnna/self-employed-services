import { Room, RoomCreateProperties, RoomId } from '../entities/room.entity';
import { UserId } from '../../users/entities/user.entity';
import { ManyItem, QueryType, WithUpdater } from '../../../../../common/interfaces/common';

export interface RoomsUseCase {
    createRoom(properties: RoomCreateProperties): Promise<Room>;

    updateRoom(roomId: RoomId, properties: RoomCreateProperties & WithUpdater): Promise<Room>;

    getRoomsByCreatorId(id: UserId, query?: QueryType): Promise<ManyItem<Room>>;

    getRooms(query?: QueryType): Promise<ManyItem<Room>>;

    deleteRoom(id: RoomId, updater: UserId): Promise<Room>;
}
