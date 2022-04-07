import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { UserId } from '../../users/entities/user.entity';
import { RentalOrmEntity } from '../../rentals/orm-entities/rental.orm-entity';
import { Room } from '../entities/room.entity';
import { ProfessionType } from '../../users/entities/user-profile.entity';
import { LargeRental } from '../../rentals/entities/rental.entity';

@Entity({ name: 'rooms', schema: 'rooms' })
export class RoomOrmEntity implements Room {
    @PrimaryColumn({ name: 'room_id', type: 'uuid' })
    roomId: string;

    @Column({ name: 'type' })
    type: ProfessionType;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'price', type: 'float' })
    price: number;

    @Column({ name: 'in_basket', type: 'boolean' })
    inBasket: boolean;

    @Column({ name: 'created', type: 'timestamp with time zone' })
    created: string;

    @Column({ name: 'created_by', type: 'uuid' })
    createdBy: UserId;

    @Column({ name: 'modified', type: 'timestamp with time zone' })
    modified: string;

    @Column({ name: 'modified_by', type: 'uuid' })
    modifiedBy: UserId;

    @OneToMany(() => RentalOrmEntity, rental => rental.room)
    @JoinColumn({ name: 'room_id', referencedColumnName: 'roomId' })
    rentals: LargeRental[];
}
