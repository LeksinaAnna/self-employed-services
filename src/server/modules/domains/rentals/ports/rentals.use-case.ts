import { Rental, RentalCreateProperties, RentalId } from '../entities/rental.entity';
import { ManyItem, QueryType, WithCreator, WithUpdater } from '../../../../../common/interfaces/common';
import { UserId } from '../../users/entities/user.entity';
import { RoomId } from '../../rooms/entities/room.entity';

export interface RentalsUseCase {
    createRental(properties: RentalCreateProperties & WithCreator): Promise<Rental>;

    updateRental(rentalId: RentalId, properties: RentalCreateProperties & WithUpdater): Promise<Rental>;

    cancelRental(rentalId: RentalId, updater: UserId): Promise<Rental>;

    getRentalsBySpecId(specialistId: UserId): Promise<ManyItem<Rental>>;

    getRentalsByRoomId(roomId: RoomId, query?: QueryType): Promise<Rental>;

    getRentalsByRoomIdAndSpecId(specialistId: UserId, roomId: RoomId): Promise<ManyItem<Rental>>;

    getRentals(query?: QueryType): Promise<ManyItem<Rental>>;
}