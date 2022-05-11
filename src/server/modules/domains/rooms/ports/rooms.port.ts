import { Room, RoomId } from '../entities/room.entity';
import { UserId } from '../../users/entities/user.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { WithRentals } from '../../rentals/entities/rental.entity';

export interface RoomsPort {
    saveRoom: (properties: Room) => Promise<Room>;

    getRoomsByCreatorId: (id: UserId, query?: QueryType) => Promise<ManyItem<Room>>;

    getRoomById: (id: RoomId, query?: QueryType) => Promise<Room & WithRentals>;

    getRooms: (query?: QueryType) => Promise<ManyItem<Room & WithRentals>>;

    getRoomsForUser: (query?: QueryType) => Promise<ManyItem<Room>>;
}
