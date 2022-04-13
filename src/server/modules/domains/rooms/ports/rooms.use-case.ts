import { RoomWithProfit, Room, RoomCreateProperties, RoomId } from '../entities/room.entity';
import { UserId } from '../../users/entities/user.entity';
import { ManyItem, QueryType, WithUpdater } from '../../../../../common/interfaces/common';
import { WithRentals } from '../../rentals/entities/rental.entity';

export interface RoomsUseCase {
    createRoom(properties: RoomCreateProperties): Promise<Room>;

    updateRoom(roomId: RoomId, properties: RoomCreateProperties & WithUpdater): Promise<Room>;

    getRoomsByCreatorId(id: UserId, query?: QueryType): Promise<ManyItem<Room>>;

    getRoomById(roomId: RoomId): Promise<Room>;

    getRooms(query?: QueryType): Promise<ManyItem<Room & WithRentals>>;

    deleteRoom(id: RoomId, updater: UserId): Promise<Room>;

    getProfit(query: QueryType): Promise<RoomWithProfit[]>;
}
