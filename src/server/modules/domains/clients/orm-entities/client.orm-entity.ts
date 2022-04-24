import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Client, ClientId } from '../entities/client.entity';
import { UserId } from '../../users/entities/user.entity';
import { RecordOrmEntity } from '../../records/orm-entities/record.orm-entity';

@Entity({ name: 'clients', schema: 'users' })
export class ClientOrmEntity implements Client {
    @PrimaryColumn({ name: 'client_id', type: 'uuid' })
    clientId: ClientId;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column({ name: 'in_basket', type: 'boolean' })
    inBasket: boolean;

    @Column({ type: 'timestamp with time zone' })
    created: string;

    @Column({ type: 'timestamp with time zone' })
    modified: string;

    @Column({ name: 'modified_by', type: 'uuid', nullable: true })
    modifiedBy: UserId;

    @OneToMany(() => RecordOrmEntity, record => record.client)
    @JoinColumn({
        name: 'client_id',
        referencedColumnName: 'clientId',
    })
    records: RecordOrmEntity[];
}
