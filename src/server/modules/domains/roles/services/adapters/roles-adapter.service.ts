import { Injectable } from '@nestjs/common';
import { createQueryBuilder } from 'typeorm';
import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';
import { RolesPort } from '../../ports/roles.port';
import { Role, RoleType } from '../../entities/role.entity';
import { RoleOrmEntity } from '../../orm-entities/role.orm-entity';
import { UserRolesOrmEntity } from '../../../users/orm-entities/user-roles.orm-entity';

@Injectable()
export class RolesAdapterService extends PersistenceAdapter implements RolesPort {
    constructor() {
        super();
    }

    async assignRoleToUser(userRole: UserRolesOrmEntity): Promise<void> {
        await this._entityManager.save(userRole);
    }

    async getRoleByValue(roleValue: RoleType): Promise<Role> {
        return await createQueryBuilder(RoleOrmEntity, 'role')
            .where(`role.value = :roleValue`, { roleValue })
            .getOne();
    }
}