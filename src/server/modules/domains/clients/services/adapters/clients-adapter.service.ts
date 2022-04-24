import { createQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ClientsPort } from '../../ports/clients.port';
import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';
import { Client, ClientEntity, ClientId } from '../../entities/client.entity';
import { ClientOrmEntity } from '../../orm-entities/client.orm-entity';

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
            .getOne()
    }
}