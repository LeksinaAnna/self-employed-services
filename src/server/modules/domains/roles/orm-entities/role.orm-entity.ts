import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { UserOrmEntity } from '../../users/orm-entities/user.orm-entity';
import { Role, RoleType } from '../entities/role.entity';

@Entity({ name: 'roles', schema: 'roles' })
export class RoleOrmEntity implements Role {
    @PrimaryColumn({ name: 'role_id', type: 'uuid' })
    roleId: string;

    @Column({ name: 'value' })
    value: RoleType;

    @Column({ name: 'description' })
    description: string;

    @ManyToMany(() => UserOrmEntity)
    @JoinTable({
        schema: 'roles',
        name: 'user_roles',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'roleId',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'userId',
        },
    })
    users: UserOrmEntity[];
}