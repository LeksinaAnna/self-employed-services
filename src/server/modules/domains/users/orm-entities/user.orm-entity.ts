import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { RoleOrmEntity } from '../../roles/orm-entities/role.orm-entity';
import { User, UserId, UserEmail } from '../entities/user.entity';
import { UserProfileOrmEntity } from './user-profile.orm-entity';

@Entity({ schema: 'users', name: 'accounts' })
export class UserOrmEntity implements User {
    @PrimaryColumn({ name: 'account_id', type: 'uuid' })
    accountId: UserId;

    @Column({ name: 'email' })
    email: UserEmail;

    @Column({ name: 'password', select: false })
    password: string;

    @Column({ name: 'created', type: 'timestamp with time zone' })
    created: string;

    @Column({ name: 'modified', type: 'timestamp with time zone' })
    modified: string;

    @Column({ name: 'modified_by', type: 'uuid' })
    modifiedBy: UserId;

    @Column({ name: 'description', select: false, nullable: true })
    description: string;

    @OneToOne(() => UserProfileOrmEntity)
    @JoinColumn({ name: 'account_id', referencedColumnName: 'profileId' })
    profile: UserProfile;

    @ManyToMany(() => RoleOrmEntity)
    @JoinTable({
        schema: 'roles',
        name: 'user_roles',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'accountId'
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'roleId'
        }
    })
    roles: RoleOrmEntity[];
}
