import { RoomsOrmEntity } from '../orm-entities/rooms.orm-entity';
import { UserId } from '../../users/entities/user.entity';

export class RoomEntity {
    created: string;
    createdBy: UserId;
    inBasket: boolean;
    modified: string;
    modifiedBy: UserId;
    price: number;
    roomId: string;
    type: string;
}