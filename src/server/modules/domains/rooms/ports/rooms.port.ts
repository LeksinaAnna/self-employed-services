import { Room, RoomId } from '../entities/room.entity';
import { UserId } from '../../users/entities/user.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';

export interface RoomsPort {
    saveRoom(properties: Room): Promise<Room>;

    getRoomsByCreatorId(id: UserId, query?: QueryType): Promise<ManyItem<Room>>;

    getRoomById(id: RoomId): Promise<Room>;

    getRooms(query?: QueryType): Promise<ManyItem<Room>>;
}
