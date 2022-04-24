import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientsUseCase } from '../ports/clients.use-case';
import { Client, ClientCreateProperties, ClientEntity, ClientId } from '../entities/client.entity';
import { ClientsAdapterService } from './adapters/clients-adapter.service';

@Injectable()
export class ClientsService implements ClientsUseCase {
    constructor(private readonly _clientsPort: ClientsAdapterService) {}

    async createClient(properties: ClientCreateProperties): Promise<Client> {
        const client = await this._clientsPort.getClientByPhoneAndEmail(properties.phone, properties.email) || {};

        const clientEntity = new ClientEntity({
            ...client,
            ...properties,
        });

        return await this._clientsPort.saveClient(clientEntity);
    }

    async getClientById(clientId: ClientId): Promise<Client> {
        const client = await this._clientsPort.getClientById(clientId);

        if (!client) {
            throw new NotFoundException('Клиент не найден')
        }

        return client;
    }
}