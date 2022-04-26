import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Record, RecordId, RecordStatus } from '../entities/record.entity';
import { UserId } from '../../users/entities/user.entity';
import { ServiceItemId } from '../../services-list/entities/service-item.entity';
import { ClientOrmEntity } from '../../clients/orm-entities/client.orm-entity';
import { ClientId } from '../../clients/entities/client.entity';
import { ServiceItemOrmEntity } from '../../services-list/orm-entities/service-item.orm-entity';

@Entity({ name: 'records', schema: 'services' })
export class RecordOrmEntity implements Record {
    @PrimaryColumn({ name: 'record_id', type: 'uuid' })
    recordId: RecordId;

    @Column({ name: 'service_id', type: 'uuid' })
    serviceId: ServiceItemId;

    @Column({ name: 'specialist_id', type: 'uuid' })
    specialistId: UserId;

    @Column({ name: 'client_id', type: 'uuid' })
    clientId: ClientId;

    @Column({ name: 'record_date', type: 'timestamp with time zone' })
    recordDate: string;

    @Column({ name: 'status' })
    status: RecordStatus;

    @Column({ name: 'created', type: 'timestamp with time zone' })
    created: string;

    @Column({ name: 'in_basket', type: 'boolean' })
    inBasket: boolean;

    @ManyToOne(() => ClientOrmEntity, client => client.records)
    @JoinColumn({
        name: 'client_id',
        referencedColumnName: 'clientId'
    })
    client: ClientOrmEntity;

    @OneToOne(() => ServiceItemOrmEntity)
    @JoinColumn({
        name: 'service_id',
        referencedColumnName: 'serviceId'
    })
    service: ServiceItemOrmEntity;
}