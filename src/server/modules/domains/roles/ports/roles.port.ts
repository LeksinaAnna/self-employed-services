import { Role, RoleType } from '../entities/role.entity';
import { UserRolesOrmEntity } from '../../users/orm-entities/user-roles.orm-entity';

export interface RolesPort {
    getRoleByValue(roleValue: RoleType): Promise<Role>;

    assignRoleToUser(userRole: UserRolesOrmEntity): Promise<void>;
}