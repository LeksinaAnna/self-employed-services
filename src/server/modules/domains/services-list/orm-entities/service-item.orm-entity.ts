import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ServiceItem, ServiceItemId } from '../entities/service-item.entity';
import { UserId } from '../../users/entities/user.entity';
import { ProfessionType } from '../../users/entities/user-profile.entity';
import { UserProfileOrmEntity } from '../../users/orm-entities/user-profile.orm-entity';

@Entity({ schema: 'services', name: 'services'})
export class ServiceItemOrmEntity implements ServiceItem {
    @PrimaryColumn({ name: 'service_id', type: 'uuid' })
    serviceId: ServiceItemId;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'description', type: 'text' })
    description: string;

    @Column({ name: 'price', type: 'float' })
    price: number;

    @Column({ name: 'duration' })
    duration: number;

    @Column({ name: 'type' })
    type: ProfessionType;

    @Column({ name: 'in_basket', type: 'boolean' })
    inBasket: boolean;

    @Column({ name: 'created', type: 'timestamp with time zone' })
    created: string;

    @Column({ name: 'modified', type: 'timestamp with time zone' })
    modified: string;

    @Column({ name: 'created_by', type: 'uuid' })
    createdBy: UserId;

    @Column({ name: 'modified_by', type: 'uuid' })
    modifiedBy: UserId;

    @ManyToOne(() => UserProfileOrmEntity, profile => profile.services)
    @JoinColumn({
        name: 'created_by',
        referencedColumnName: 'profileId'
    })
    specialist: UserProfileOrmEntity;
}
