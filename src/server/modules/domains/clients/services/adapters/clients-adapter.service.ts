import { Brackets, createQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ClientsPort } from '../../ports/clients.port';
import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';
import { Client, ClientEntity, ClientId } from '../../entities/client.entity';
import { ClientOrmEntity } from '../../orm-entities/client.orm-entity';
import { UserId } from '../../../users/entities/user.entity';
import { ManyItem, QueryType } from '../../../../../../common/interfaces/common';

@Injectable()
export class ClientsAdapterService extends PersistenceAdapter implements ClientsPort {
    constructor() {
        super();
    }

    async saveClient(clientEntity: ClientEntity): Promise<Client> {
        return await this._entityManager.save(ClientOrmEntity, clientEntity);
    }

    async getClientById(clientId: ClientId): Promise<Client> {
        return await createQueryBuilder(ClientOrmEntity, 'client')
            .where(`client.clientId = :clientId`, { clientId })
            .getOne();
    }

    async getClientByPhoneAndEmail(phone: string, email: string): Promise<Client> {
        return await createQueryBuilder(ClientOrmEntity, 'client')
            .where(`client.phone = :phone`, { phone })
            .andWhere(`client.email = :email`, { email })
            .getOne();
    }

    async getClientsBySpecialistId(
        specialistId: UserId,
        { take = '10', skip = '0', search }: QueryType,
    ): Promise<ManyItem<Client>> {
        const [items, count] = await createQueryBuilder(ClientOrmEntity, 'client')
            .leftJoin('client.records', 'record')
            .where(`record.specialistId = :specialistId`, { specialistId })
            .andWhere(new Brackets(qb => {
                if (search) {
                    qb.where(`client.name ILIKE :value`, { value: `%${search}%` })
                }
            }))
            .take(parseInt(take, 10))
            .skip(parseInt(skip, 10))
            .getManyAndCount();

        return {items, count}
    }
}