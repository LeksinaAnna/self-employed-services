import { Room, RoomCreateProperties, RoomId } from '../entities/room.entity';
import { UserId } from '../../users/entities/user.entity';
import { ManyItem, QueryType, WithCreator } from '../../../../../common/interfaces/common';

export interface RoomsUseCase {
    createRoom(properties: RoomCreateProperties): Promise<Room>;

    updateRoom(properties: RoomCreateProperties & WithCreator): Promise<Room>;

    getRoomsByCreatorId(id: UserId, query?: QueryType): Promise<ManyItem<Room>>;

    getRooms(query?: QueryType): Promise<ManyItem<Room>>;

    deleteRoom(id: RoomId, creator: UserId): Promise<Room>;
}
