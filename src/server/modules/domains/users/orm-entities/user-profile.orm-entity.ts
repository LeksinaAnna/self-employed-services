import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProfessionType, UserContacts, UserProfile } from '../entities/user-profile.entity';
import { UserId } from '../entities/user.entity';
import { RentalOrmEntity } from '../../rentals/orm-entities/rental.orm-entity';

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

    @Column({ name: 'profession', type: 'character varying' })
    profession: ProfessionType;

    @OneToMany(() => RentalOrmEntity, rental => rental.profile)
    rentals: RentalOrmEntity[];
}
