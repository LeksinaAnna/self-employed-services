import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UserId } from '../entities/user.entity';

@Entity({ name: 'user_roles', schema: 'roles' })
export class UserRolesOrmEntity {
    @PrimaryColumn({ name: 'id', type: 'uuid' })
    id: string;

    @Column({ name: 'user_id', type: 'uuid' })
    userId: UserId;

    @Column({ name: 'role_id', type: 'uuid' })
    roleId: string;
}