import { Rental, RentalId } from '../entities/rental.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { RoomId } from '../../rooms/entities/room.entity';
import { UserId } from '../../users/entities/user.entity';

export interface RentalsPort {
    saveRental(rental: Rental): Promise<Rental>;

    getRentals(query: QueryType): Promise<ManyItem<Rental>>;

    getRentalsByRoomId(roomId: RoomId, query?: QueryType): Promise<Rental>;

    getRentalById(rentalId: RentalId): Promise<Rental>;

    getRentalsBySpecId(specialistId: UserId, roomId?: RoomId): Promise<ManyItem<Rental>>;
}