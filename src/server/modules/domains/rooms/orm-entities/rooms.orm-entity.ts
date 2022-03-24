import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UserId } from '../../users/entities/user.entity';

@Entity({ name: 'rooms', schema: 'rooms' })
export class RoomsOrmEntity {
    @PrimaryColumn({ name: 'room_id', type: 'uuid' })
    roomId: string;

    @Column({ name: 'type' })
    type: string;

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
}
