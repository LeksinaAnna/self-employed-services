import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RoomOrmEntity } from '../../rooms/orm-entities/room.orm-entity';
import { UserId } from '../../users/entities/user.entity';
import { Rental } from '../entities/rental.entity';

@Entity({ schema: 'rooms', name: 'rentals' })
export class RentalOrmEntity implements Rental {
    @PrimaryColumn({ name: 'rental_id', type: 'uuid' })
    rentalId: string;

    @Column({ name: 'room_id', type: 'uuid' })
    roomId: string;

    @Column({ name: 'specialist_id', type: 'uuid' })
    specialistId: UserId;

    @Column({ name: 'duration', type: 'number' })
    duration: number;

    @Column({ name: 'created', type: 'timestamp with time zone' })
    created: string;

    @Column({ name: 'in_basket', type: 'boolean' })
    inBasket: boolean;

    @ManyToOne(() => RoomOrmEntity, room => room.rentals)
    @JoinColumn({ name: 'room_id', referencedColumnName: 'roomId' })
    room: RoomOrmEntity;
}
