import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import * as dotenv from 'dotenv';

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
    autoLoadEntities: true,
    entities: [

    ],
}