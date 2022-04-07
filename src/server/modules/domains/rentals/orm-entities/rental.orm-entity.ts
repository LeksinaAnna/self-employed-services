import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RoomOrmEntity } from '../../rooms/orm-entities/room.orm-entity';
import { UserId } from '../../users/entities/user.entity';
import { Rental } from '../entities/rental.entity';
import { UserProfileOrmEntity } from '../../users/orm-entities/user-profile.orm-entity';

@Entity({ schema: 'rooms', name: 'rentals' })
export class RentalOrmEntity implements Rental {
    @PrimaryColumn({ name: 'rental_id', type: 'uuid' })
    rentalId: string;

    @Column({ name: 'room_id', type: 'uuid' })
    roomId: string;

    @Column({ name: 'specialist_id', type: 'uuid' })
    specialistId: UserId;

    @Column({ name: 'start_date', type: 'timestamp with time zone' })
    startDate: string;

    @Column({ name: 'finish_date', type: 'timestamp with time zone' })
    finishDate: string;

    @Column({ name: 'created', type: 'timestamp with time zone' })
    created: string;

    @Column( { name: 'modified', type: 'timestamp with time zone' })
    modified: string;

    @Column({ name: 'modified_by', type: 'uuid' })
    modifiedBy: UserId;

    @Column({ name: 'in_basket', type: 'boolean' })
    inBasket: boolean;

    @ManyToOne(() => RoomOrmEntity, room => room.rentals)
    @JoinColumn({ name: 'room_id', referencedColumnName: 'roomId' })
    room: RoomOrmEntity;

    @ManyToOne(() => UserProfileOrmEntity, user => user.rentals)
    @JoinColumn({ name: 'specialist_id', referencedColumnName: 'profileId' })
    profile: UserProfileOrmEntity;
}
