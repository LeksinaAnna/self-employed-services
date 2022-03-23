import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { UserOrmEntity } from '../../users/orm-entities/user.orm-entity';

@Entity({name: 'roles', schema: 'roles'})
export class RoleOrmEntity {
    @PrimaryColumn({ name: 'role_id', type: 'uuid' })
    roleId: string;

    @Column({ name: 'value' })
    value: string;

    @Column({ name: 'description' })
    description: string;

    @ManyToMany(() => UserOrmEntity)
    @JoinTable({
        schema: 'roles',
        name: 'user_roles',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'roleId'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'userId'
        }
    })
    users: UserOrmEntity[];
}