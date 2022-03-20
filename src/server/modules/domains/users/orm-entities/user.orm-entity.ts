import { User, UserId, UserLogin } from '../entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { UserProfileOrmEntity } from './user-profile.orm-entity';

@Entity({ schema: 'users', name: 'users' })
export class UserOrmEntity implements User {
    @PrimaryColumn({ name: 'user_id', type: 'uuid' })
    userId: UserId;

    @Column({ name: 'login' })
    login: UserLogin;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'created', type: 'timestamp with time zone' })
    created: string;

    @OneToOne(() => UserProfileOrmEntity)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'profileId' })
    profile: UserProfile;
}
