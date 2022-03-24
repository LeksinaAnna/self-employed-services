import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
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
    users: UserOrmEntity[];
}