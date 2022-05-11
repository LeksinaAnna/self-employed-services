import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { ProfessionType, UserContacts, UserProfile } from '../entities/user-profile.entity';
import { UserId } from '../entities/user.entity';
import { RentalOrmEntity } from '../../rentals/orm-entities/rental.orm-entity';
import { RoomId } from '../../rooms/entities/room.entity';
import { ServiceItemOrmEntity } from '../../services-list/orm-entities/service-item.orm-entity';

@Entity({ schema: 'users', name: 'users_profile' })
export class UserProfileOrmEntity implements UserProfile {
    @PrimaryColumn({ name: 'profile_id', type: 'uuid' })
    profileId: UserId;

    @Column({ name: 'birthday', type: 'date' })
    birthday: string;

    @Column({ name: 'contacts', type: 'jsonb' })
    contacts: UserContacts;

    @Column({ name: 'full_name' })
    fullName: string;

    @Column({ name: 'description', select: false })
    description: string;

    @Column({ name: 'profession', type: 'character varying' })
    profession: ProfessionType;

    @Column({ name: 'selected_room', type: 'uuid', nullable: true })
    selectedRoom: RoomId;

    @OneToMany(() => RentalOrmEntity, rental => rental.profile)
    rentals: RentalOrmEntity[];

    @OneToMany(() => ServiceItemOrmEntity, service => service.specialist)
    @JoinColumn({
        name: 'profile_id',
        referencedColumnName: 'createdBy'
    })
    services: ServiceItemOrmEntity[];
}
