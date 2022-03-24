import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UserContacts, UserProfile } from '../entities/user-profile.entity';
import { UserId } from '../entities/user.entity';

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
}
