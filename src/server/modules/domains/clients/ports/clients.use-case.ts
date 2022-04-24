import { Client, ClientCreateProperties, ClientId } from '../entities/client.entity';
import { ManyItem, QueryType, WithUpdater } from '../../../../../common/interfaces/common';
import { UserId } from '../../users/entities/user.entity';

export interface ClientsUseCase {
    createClient: (properties: ClientCreateProperties) => Promise<Client>;

    getClientById: (clientId: ClientId) => Promise<Client>;

    getClientsBySpecialistId: (specialistId: UserId, query: QueryType) => Promise<ManyItem<Client>>;

    updateClient: (clientId: ClientId, properties: ClientCreateProperties & WithUpdater) => Promise<Client>;
}