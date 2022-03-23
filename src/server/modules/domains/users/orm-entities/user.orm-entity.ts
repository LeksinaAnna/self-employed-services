import { User, UserId, UserEmail } from '../entities/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { UserProfileOrmEntity } from './user-profile.orm-entity';
import { RoleOrmEntity } from '../../roles/orm-entities/role.orm-entity';

@Entity({ schema: 'users', name: 'users' })
export class UserOrmEntity implements User {
    @PrimaryColumn({ name: 'user_id', type: 'uuid' })
    userId: UserId;

    @Column({ name: 'email' })
    email: UserEmail;

    @Column({ name: 'password', select: false })
    password: string;

    @Column({ name: 'created', type: 'timestamp with time zone' })
    created: string;

    @OneToOne(() => UserProfileOrmEntity)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'profileId' })
    profile: UserProfile;

    @ManyToMany(() => RoleOrmEntity)
    @JoinTable({
        schema: 'roles',
        name: 'user_roles',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'userId'
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'roleId'
        }
    })
    userRoles: string[];
}
