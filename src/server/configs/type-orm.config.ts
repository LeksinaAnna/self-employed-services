import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import {UserOrmEntity} from "../modules/domains/users/orm-entities/user.orm-entity";
import {UserProfileOrmEntity} from "../modules/domains/users/orm-entities/user-profile.orm-entity";
import {TokenOrmEntity} from "../modules/domains/tokens/orm-entities/token-orm.entity";
import { UserRolesOrmEntity } from '../modules/domains/users/orm-entities/user-roles-orm.entity';
import { RoleOrmEntity } from '../modules/domains/roles/orm-entities/role.orm-entity';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    logger: 'file',
    // @ts-ignore
    logging: process.env.TYPEORM_LOGGING || false,
    retryAttempts: 5,
    retryDelay: 1000,
    entities: [
        UserOrmEntity,
        UserProfileOrmEntity,
        TokenOrmEntity,
        RoleOrmEntity,
        UserRolesOrmEntity
    ],
    autoLoadEntities: true,
}