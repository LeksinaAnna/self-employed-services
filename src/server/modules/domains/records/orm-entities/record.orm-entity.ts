import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Record, RecordContacts, RecordId, RecordStatus } from '../entities/record.entity';
import { UserId } from '../../users/entities/user.entity';
import { ServiceItemId } from '../../services-list/entities/service-item.entity';

@Entity({ name: 'records', schema: 'services' })
export class RecordOrmEntity implements Record {
    @PrimaryColumn({ name: 'record_id', type: 'uuid' })
    recordId: RecordId;

    @Column({ name: 'service_id', type: 'uuid' })
    serviceId: ServiceItemId;

    @Column({ name: 'specialist_id', type: 'uuid' })
    specialistId: UserId;

    @Column({ name: 'record_date', type: 'timestamp with time zone' })
    recordDate: string;

    @Column({ name: 'status' })
    status: RecordStatus;

    @Column({ name: 'contacts', type: 'jsonb'})
    contacts: RecordContacts;

    @Column({ name: 'created', type: 'timestamp with time zone' })
    created: string;

    @Column({ name: 'in_basket', type: 'boolean' })
    inBasket: boolean;
}