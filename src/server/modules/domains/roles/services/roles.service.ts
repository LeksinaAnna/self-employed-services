import { Injectable, NotFoundException } from '@nestjs/common';
import { RolesUseCase } from '../ports/roles.use-case';
import { Role, RoleType } from '../entities/role.entity';
import { UserId } from '../../users/entities/user.entity';
import { UserRolesOrmEntity } from '../../users/orm-entities/user-roles.orm-entity';
import { RolesAdapterService } from './adapters/roles-adapter.service';

@Injectable()
export class RolesService implements RolesUseCase {
    constructor(private readonly _rolesAdapter: RolesAdapterService) {
    }

    async assignRoleToUser(userId: UserId, roleValue: RoleType): Promise<Role> {
        const role = await this._rolesAdapter.getRoleByValue(roleValue);
        if (!role) {
            throw new NotFoundException('Роль не найдена');
        }

        const roleEntity = new UserRolesOrmEntity(userId, role.roleId);
        await this._rolesAdapter.assignRoleToUser(roleEntity);

        return role;
    }
}