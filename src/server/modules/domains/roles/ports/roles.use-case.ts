import { UserId } from '../../users/entities/user.entity';
import { Role, RoleType } from '../entities/role.entity';

export interface RolesUseCase {
    assignRoleToUser(userId: UserId, role: RoleType): Promise<Role>;
}